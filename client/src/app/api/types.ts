export interface User {
    email: string
    password: string
}

export interface UserResponse {
    user: User
    token: string
}
