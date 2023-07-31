import {
    createBrowserRouter,
} from "react-router-dom";
import SignUp from "./components/SignUp/SignUp";
import { AllUsers } from "./components/Users/AllUsers";
import Login from "./components/Login/Login";
import { Dashboard } from "./components/Dashboard/Dashboard";
import { HomeLayout } from "./components/Layout/HomeLayout";
import { UserDetails } from "./components/Forms/UserDetails";
import { Home } from "./App";

export const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <HomeLayout>
                <Home />
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