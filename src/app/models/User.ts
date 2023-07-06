import { Role } from "./Role";

export interface User {
    id: number;
    login: string;
    email: string;
    cpf: string;
    password: string;
    roleId: number;
    createDate: Date;
    updateDate: Date;
    role: Role;
}
