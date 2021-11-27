import React from "react";
import { Navigate, Outlet } from "react-router";
import Auth from "./auth"

const AuthRoute = () => {
    const expired = Auth.isTokenExpired(Auth.getToken())
    return !expired ? <Outlet /> : <Navigate to="/login" />
}

export default AuthRoute