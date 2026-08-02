import type { User } from "./user.interface";

export interface authResponse {
    user: User;
    token: string;
}


