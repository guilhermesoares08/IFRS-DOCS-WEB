export class UserLogin {
    
    public constructor(init?: Partial<UserLogin>) {
        Object.assign(this, init);        
    }
    
    id!: number;
    userName!: string;
    token!: string;
    role!: string;
}
