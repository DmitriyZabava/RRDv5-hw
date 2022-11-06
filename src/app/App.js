import React from "react";

import "../App.css";
import { Link, Redirect, Route, Switch, useParams } from "react-router-dom";
import users from "./mockUser/mockUser";

const UsersLayout = () => {
    const { userId } = useParams();
    return (
        <div>
            <Link to='/users'>Users List Page</Link>
            <h1>Users Layout</h1>
            <Link to='/'>Main Page</Link>
            {userId ? (
                <Switch>
                    <Route
                        path={`/users/:userId/profile`}
                        component={UserPage}
                    />
                    <Route
                        path={`/users/:userId/edit`}
                        component={EditUserPage}
                    />
                    <Route path='/users/*'>
                        <Redirect to={`/users/${userId}/profile`} />
                    </Route>
                </Switch>
            ) : (
                <UsersListPage />
            )}
        </div>
    );
};
const HomePage = () => {
    return (
        <div>
            <Link to='/users'>Users List Page</Link>
            <h1>Home Page</h1>
        </div>
    );
};
const UsersListPage = () => {
    return (
        <div>
            <h3>User List Page</h3>
            <ul>
                {users.map((user) => {
                    return (
                        <li key={user.id}>
                            <Link to={`/users/${user.id}`}>{user.name}</Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};
const UserPage = () => {
    const { userId } = useParams();

    return (
        <ul>
            <li>
                <Link to='/users'>Users List Page</Link>
            </li>
            <li>
                <Link to={`/users/${userId}/edit`}>Edit This User</Link>
            </li>

            <p>{`User ID : ${userId}`}</p>
        </ul>
    );
};
const EditUserPage = () => {
    const { userId } = useParams();
    return (
        <div>
            <ul>
                <li>
                    <Link to={`/users`}>Users List Page</Link>
                </li>
                <li>
                    <h3>Edit User Page</h3>
                </li>
                <li>
                    <Link to={`/users/${userId}/profile`}>
                        User Profile Page
                    </Link>
                </li>
                <li>
                    <Link to={`/users/${Number(userId) + 1}/profile`}>
                        Another User
                    </Link>
                </li>
            </ul>
        </div>
    );
};

function App() {
    return (
        <div className='App'>
            <h1>App Layout</h1>
            <Switch>
                <Route path='/users/:userId?/:edit?' component={UsersLayout} />
                <Route path='/' exact component={HomePage} />

                <Route path='*'>
                    <Redirect to='/' />
                </Route>
            </Switch>
        </div>
    );
}

export default App;
