import { Role } from "./Role";

export interface User {
    id: number;
    description: string;
    email: string;
    CPF: string;
    password: string;
    roleId: number;
    createDate: Date;
    updateDate: Date;
    role: Role;
}
