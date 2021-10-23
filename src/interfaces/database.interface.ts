export interface IDatabaseConObj {
    host: string,
    user?: string,
    password: string,
    database: string,
    connectionLimit?: any,
    queueLimit?: any
}