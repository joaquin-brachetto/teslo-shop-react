import { tesloApi } from "@/api/teslo-api";
import type { authResponse } from "@/interfaces/auth.response";

export const loginAction = async (email: string, password: string): Promise<authResponse> => {
    try {
        const { data } = await tesloApi.post<authResponse>('/auth/login', {
            email,
            password,
        });
        return data;
    } catch (error) {
        console.log(error)
        throw error;
    }
}
