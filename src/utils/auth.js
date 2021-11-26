import React from "react";
import { Navigate, Outlet } from "react-router";

const AuthRoute = () => {
    let auth = false
    if (localStorage.getItem("token")) {
        auth = true
    }
    return auth ? <Outlet /> : <Navigate to="/login" />
}

export default AuthRoute