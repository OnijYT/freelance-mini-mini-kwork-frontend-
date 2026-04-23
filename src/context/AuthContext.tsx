import React, { createContext, useState, type ReactNode,  } from "react";

interface AuthContexType {
    token: string | null
    login: (token: string) => void
    logout: () => void
}

export const AuthContext = createContext<AuthContexType | null>(null)

export const AuthProvider = ({children}: {children: ReactNode}) => {
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'))

    const login = (NewToken: string) => {
        localStorage.setItem('token', NewToken)
        setToken(NewToken)
    }

    const logout = () => {
        localStorage.removeItem('token')
        setToken(null)
    }

    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}