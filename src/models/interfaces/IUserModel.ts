export default interface IUserModel {
    registerUser (email: string, encrypted: string): Promise<boolean>
    getUser (email: string): Promise<any | undefined>
}