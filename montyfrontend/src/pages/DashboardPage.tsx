import { useEffect, useState } from "react";
import Chart from "../components/Dashboard/Chart";
import Dashboard from "../components/Dashboard/Dashboard";
import UsersService, { User } from "../services/UsersService";

function DashboardPage() {
    const [users, setUsers] = useState<User[]>([]);
    useEffect(() => {

        UsersService.getAllUsers().then(data => {
            setUsers(data);
        });

    }, []);
    return (
        <>
            <h3>Dashboard Page</h3>
            <a href="/users"> Go to users page </a>
            <br /><br />
            <Dashboard count={users.length}></Dashboard>
            <br /><br />
            <Chart users={users} ></Chart>
        </>

    );
}

export default DashboardPage;