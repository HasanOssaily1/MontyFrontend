import { Alert, Button, Snackbar, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { View } from '../../redux/actions/userActions';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import UsersService from '../../services/UsersService';
import Loader from '../Common/loader';
import CheckIcon from '@mui/icons-material/Check';

// Validation Schema using Yup
const validationSchema = Yup.object({
    name: Yup.string().required('name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required').min(3, 'Password must be at least 3 characters')
});

function UserForm() {
    const dispatch = useDispatch<AppDispatch>();
    const [Message, setMessage] = useState(""); 
    const [showloader, setshowloader] = useState(false); 
    const [showMessage, setshowMessage] = useState(false); 
    const submit = async (values: { name: string, email: string; password: string }) => {
        setshowloader(true);
        try {
            
            const result = await UsersService.create({
                id: 0,
                name: values.name,
                email: values.email,
                password: values.password,
                modificationdate: Date.now,
                creationdate: Date.now
            });
            setMessage("User Added Successfully :)");
            setshowMessage(true);
            
        } catch (error) {
            
            setMessage("User already exists");
            setshowMessage(true);
        }
        setshowloader(false);
    };

    return (
        <>
            <Button variant="contained" onClick={() => { dispatch(View()) }}>View List</Button>
            <br />
            <p>Add User</p>
            <Formik
                initialValues={{ name: '', email: '', password: '' }}
                validationSchema={validationSchema}
                onSubmit={(values) => submit(values)}
            >
                <Form>
                    <Field name="name" as={TextField} label="Name" fullWidth variant="outlined" helperText={<ErrorMessage name="name" />} style={{ marginBottom: '20px' }} />

                    <Field name="email" as={TextField} label="Email" fullWidth variant="outlined" helperText={<ErrorMessage name="email" />} style={{ marginBottom: '20px' }} />

                    <Field name="password" type="password" fullWidth as={TextField} label="Password" variant="outlined" helperText={<ErrorMessage name="password" />} style={{ marginBottom: '20px' }} />

                    <Button type="submit" color="primary" variant="contained" style={{ marginTop: '20px' }}>
                        Submit
                    </Button>
                </Form>

            </Formik>
          
            <Loader show={showloader}></Loader>
            <Snackbar open={showMessage} autoHideDuration={3000} message={Message} onClose={() => setshowMessage(false)} />
          
        </>
    );
}

export default UserForm;