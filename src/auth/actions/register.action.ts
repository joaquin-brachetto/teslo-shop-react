import { tesloApi } from "@/api/teslo-api";
import type { authResponse } from "@/interfaces/auth.response";

export const registerAction = async (email: string, password: string, fullName: string): Promise<authResponse> => {
    try {
        const { data } = await tesloApi.post<authResponse>('/auth/register', {
            email,
            password,
            fullName,
        });
        return data;
    } catch (error) {
        console.log(error)
        throw error;
    }
}
