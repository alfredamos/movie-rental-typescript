import { UserType } from "./user-type.model";

export class User {
    id?: string;
    name!: string;
    email!: string;
    phone!: string;
    password!: string;  
    newPassword?: string;  
    isGold?: boolean = false;
    userType: UserType;
    
}