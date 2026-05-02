
export interface ApiResponse<T> {
    user: T
    token: string
    message?: string 
}


export interface User {
    id: string
    fullname: string
    email: string
    role: string
}