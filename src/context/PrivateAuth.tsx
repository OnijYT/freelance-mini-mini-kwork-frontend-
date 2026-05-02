import React, { useContext, type JSX } from "react";
import { AuthContext } from "./AuthContext";
import { Navigate } from "react-router-dom";


export const PrivateProvider = ({children}: {children: JSX.Element}) => {
    const Auth = useContext(AuthContext)

    if(!Auth?.token) {
        return <Navigate to="/login" />
    }

    return children
}