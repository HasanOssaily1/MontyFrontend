import { Button, Snackbar, TextField } from '@mui/material';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { AppDispatch, RootState } from '../../redux/store';
import {  useState } from 'react';
import UsersService, { User } from '../../services/UsersService';
import { View } from '../../redux/actions/userActions';
import Loader from '../Common/loader';

// Validation Schema using Yup
const validationSchema = Yup.object({
    name: Yup.string().required('name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(3, 'Password must be at least 3 characters')
});
function UserPage() {
    const user: User = useSelector((state: RootState) => state.userdetails.value);
    const dispatch = useDispatch<AppDispatch>();
    const [Message, setMessage] = useState("");
    const [showloader, setshowloader] = useState(false); 
    const [showMessage, setshowMessage] = useState(false); 
    const submit = async (values: { name: string, email: string; password: string }) => {
        setshowloader(true);
        try {

             await UsersService.edit(user.id,{
                id: user.id,
                name: values.name,
                email: values.email,
                 password: values.password,
                 modificationdate: Date.UTC,
                creationdate: user.creationdate
            });
            setMessage("User Updated Successfully :)");
            setshowMessage(true);
        } catch (error) {

            setMessage("Could not update user");
            setshowMessage(true);
        }
        setshowloader(false);
    };
    const deleteUser = async () => {
        setshowloader(true);
        try {

             await UsersService.delete(user.id);
            
            dispatch(View());
           
        } catch (error) {
            console.log("Fail to delete user");
            setshowMessage(true);

        }
        setshowloader(false);
        
    };


    return (
        <>
            <Button variant="contained" onClick={() => { dispatch(View()) }}>View List</Button>
            <br />
            <p>Edit User</p>
            <Formik
                initialValues={{ ...user, password: '' }}
                validationSchema={validationSchema}
                onSubmit={(values) => submit(values)}
            >
                <Form>
                    <Field name="name" as={TextField} label="Name" fullWidth variant="outlined" helperText={<ErrorMessage name="name" />} style={{ marginBottom: '20px' }} />

                    <Field name="email" as={TextField} disabled label="Email" fullWidth variant="outlined" helperText={<ErrorMessage name="email" />} style={{ marginBottom: '20px' }} />

                    <Field name="password" type="password" fullWidth as={TextField} label="Password" variant="outlined" helperText={<ErrorMessage name="password" />} style={{ marginBottom: '20px' }} />
                    <Field name="modificationdate" as={TextField} label="Last modified" fullWidth disabled variant="outlined" style={{ marginBottom: '20px' }} />
                    <Field name="creationdate" as={TextField} label="Creation date" fullWidth disabled variant="outlined" style={{ marginBottom: '20px' }} />

                    <Button type="submit" color="primary" variant="contained" style={{ marginTop: '20px' }}>
                        Save
                    </Button>
                </Form>

            </Formik>
            <Button color="error" variant="contained" style={{ marginTop: '20px' }} onClick={() => deleteUser()}>
                Delete
            </Button>
            <Loader show={showloader}></Loader>
            <Snackbar open={showMessage} autoHideDuration={3000} message={Message} onClose={() => setshowMessage(false)} />
        </>
    );
}

export default UserPage;