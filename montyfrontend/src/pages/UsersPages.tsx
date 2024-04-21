import { useEffect, useState } from 'react';
import UsersList from '../components/Users/UsersList';
import UsersService, { User } from '../services/UsersService';
import {  useSelector } from 'react-redux';
import {  RootState } from '../redux/store';
import UserForm from '../components/Users/UserForm';
import UserPage from '../components/Users/UserPage';

function UsersPages() {
    const [users, setUsers] = useState<User[]>([]);
    
    const View = useSelector((state: RootState) => state.userview.value);

    useEffect(() => {
        if (View == "list") {
            UsersService.getAllUsers().then(data => {
                setUsers(data);
            });
        }
       
    }, [View]);
    const getView = () => {
        switch (View) {
            case "edit":
                return <UserPage></UserPage>;
            case "add":
                return <UserForm></UserForm>;
            default:
                return <UsersList Users={users}></UsersList>;
        }
    }
  return (
      <>
          <h3>Users Page</h3>
          <a href="/dashboard"> Go to dashboard page </a>
          {getView()}
         
      </>
  );
}

export default UsersPages;