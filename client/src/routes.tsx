import {
    createBrowserRouter,
} from "react-router-dom";
import SignUp from "./components/SignUp/SignUp";
import { AllUsers } from "./components/Users/AllUsers";
import App from "./App";
import Login from "./components/Login/Login";
import { Dashboard } from "./components/Dashboard/Dashboard";
import { HomeLayout } from "./components/Layout/HomeLayout";
import { UserDetails } from "./components/Forms/UserDetails";

export const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <HomeLayout>
                <div style={{ height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <h1>U2017 Class Album</h1>
                </div>
            </HomeLayout>
        ),
    },
    {
        path: "/signup",
        element: (
            <HomeLayout>
                <SignUp />
            </HomeLayout>
        )
    },
    {
        path: "/login",
        element: (
            <HomeLayout>
                <Login />
            </HomeLayout>
        ),
    },
    {
        path: "/users",
        element: (
            <HomeLayout>
                <AllUsers />
            </HomeLayout>
        )
    },
    {
        path: "/user",
        element: (
            <Dashboard children={(
                <UserDetails />
            )} />
        )
    },
]);