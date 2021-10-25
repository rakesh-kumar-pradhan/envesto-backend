export interface ISignUpUser {
    name?: string,
    email?: string,
    phone?: string,
    dob?: String
}

export interface IAdminLogin {
    email: string,
    password: string
}

export interface ILoggedInUser {
    _id: string,
    email?: string,
    phone: string,
    name?: string,
    dob?: string,
}