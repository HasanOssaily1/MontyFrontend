import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Paper from '@mui/material/Paper';
import { User } from '../../services/UsersService';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { Add, Edit, setUser } from '../../redux/actions/userActions';


function UsersList({ Users }) {
    const dispatch = useDispatch<AppDispatch>();
    const viewUser = (user: User) => {
        dispatch(setUser(user));
        dispatch(Edit());
    }
    return (
        <>
            <Button variant="contained" onClick={() => { dispatch(Add()) }}>Add</Button>
            <br />
            <br />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell align="right">Name</TableCell>
                            <TableCell align="right">Email</TableCell>
                            <TableCell align="right">Last modified</TableCell>
                            <TableCell align="right">Creation date</TableCell>
                            <TableCell>View/Edit</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Users.map((row: User) => (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.id}
                                </TableCell>
                                <TableCell align="right">{row.name}</TableCell>
                                <TableCell align="right">{row.email}</TableCell>
                                <TableCell align="right">{row.modificationdate.toLocaleString()}</TableCell>
                                <TableCell align="right">{row.creationdate.toLocaleString()}</TableCell>
                                <TableCell align="right"> <Button variant="contained" onClick={()=>viewUser(row)}>View</Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default UsersList;