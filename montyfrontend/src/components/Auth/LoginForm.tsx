
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import AuthService from "../../services/AuthService";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { LogIn } from '../../redux/actions/authActions';
import { useNavigate } from "react-router-dom";
import { Snackbar } from "@mui/material";
import Loader from "../Common/loader";

// Validation Schema using Yup
const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required').min(3, 'Password must be at least 3 characters')
});

function LoginForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const [LoginErrorMessage, setLoginErrorMessage] = useState(""); 
    const [showloader, setshowloader] = useState(false);
    const [showMessage, setshowMessage] = useState(false); 
    const submit = async (values: { email: string; password: string }) => {
        setshowloader(true)
        try {
           
            const success = await AuthService.login({ email: values.email, password: values.password });
            if (success) {
                setshowloader(false)
                dispatch(LogIn());
                navigate('/dashboard', { replace: true });
            }
        } catch (error) {
            setshowMessage(true);
            setLoginErrorMessage("Invalid Email or Password !!! :(")
        }
        setshowloader(false)
    };
    return (
        <>
            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={validationSchema}
                onSubmit={(values) => submit(values)}
            >
                <Form>
                    <Field name="email" as={TextField} label="Email" fullWidth variant="outlined" helperText={<ErrorMessage name="email" />} style={{ marginBottom: '20px' }} />
                    
                    <Field name="password" type="password" fullWidth as={TextField} label="Password" variant="outlined" helperText={<ErrorMessage name="password" />} style={{ marginBottom: '20px' }} />
                  
                    <Button type="submit" color="primary" variant="contained" style={{ marginTop: '20px' }}>
                        Submit
                    </Button>
                </Form>

            </Formik>
        
            <Loader show={showloader}></Loader>
            <Snackbar open={showMessage} autoHideDuration={3000} message={LoginErrorMessage} onClose={() => setshowMessage(false)} />

        </>
    );
}

export default LoginForm;