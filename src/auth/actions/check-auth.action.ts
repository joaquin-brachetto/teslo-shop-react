import { tesloApi } from "@/api/teslo-api"
import type { authResponse } from "@/interfaces/auth.response"

export const checkAuthAction = async (): Promise<authResponse> => {
    const token = localStorage.getItem('token')
    if (!token) throw new Error('Token not found')

    try {
        const { data } = await tesloApi.get<authResponse>('/auth/check-status')
        localStorage.setItem('token', data.token)
        return data
    } catch (error) {
        console.log(error)
        localStorage.removeItem('token')
        throw new Error('Token expired or not valid')

    }
}