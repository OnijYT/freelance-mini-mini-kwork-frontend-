import React, { createContext, useEffect, useState, type ReactNode,  } from "react";
import type { ApiResponse, User } from "../types/auth";
import { api } from "../api";

interface AuthContexType {
    user: User | null
    login: (data: ApiResponse<User>) => void
    logout: () => void
}

export const AuthContext = createContext<AuthContexType | null>(null)

export const AuthProvider = ({children}: {children: ReactNode}) => {
    const [user, setUser] = useState<User | null>(null)
    const [isloading, setIsloading] = useState(true)

    useEffect(() => {
        const checkauth = async () => {
            const token = localStorage.getItem('token')
            if(!token) {
                setIsloading(false)
                return 
            }
            try {
                const res = await api.get<User>('/checkauth/me')
                setUser(res.data)
            } catch (e) {
                console.error(e)
                localStorage.removeItem('token')
                setUser(null)
            } finally{
                setIsloading(false)
            }

        }
        checkauth()
    }, [])

    const login = (data: ApiResponse<User>) => {
        localStorage.setItem('token', data.token)
        setUser(data.user)
    }

    const logout = () => {
        localStorage.removeItem('token')
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {!isloading ? children : <div>Загрузка...</div>}
        </AuthContext.Provider>
    )
}