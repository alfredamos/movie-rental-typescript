import { UserType } from './user-type.model';

export class userResponse {
    id: string;
    name: string;
    userType: UserType;
    token: string;
}