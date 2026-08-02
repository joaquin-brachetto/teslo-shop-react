import type { User } from '@/interfaces/user.interface';
import { create } from 'zustand';
import { checkAuthAction } from '../actions/check-auth.action';
import { loginAction } from '../actions/login.action';
import { registerAction } from '../actions/register.action';

type AuthState = {
    // Properties
    user: User | null;
    token: string | null;
    authStatus: string | null;

    // Getters

    isAdmin: () => boolean,


    // Actions 
    login: (email: string, password: string) => Promise<boolean>;
    register: (email: string, password: string, fullName: string) => Promise<boolean>;
    logout: () => void;
    checkAuthStatus: () => Promise<boolean>;
}

export const useAuthState = create<AuthState>()((set, get) => ({
    // Implementacion
    user: null,
    token: null,
    authStatus: 'checking',

    // Getters 

    isAdmin: () => {
        const roles = get().user?.roles || []
        return roles.includes('admin')
    },

    // Actions
    login: async (email: string, password: string) => {
        try {
            const data = await loginAction(email, password);
            localStorage.setItem('token', data.token)
            set({ user: data.user, token: data.token, authStatus: 'authenticated' })
            return true;
        } catch (error) {
            localStorage.removeItem('token')
            set({ user: null, token: null, authStatus: 'not-authenticated' })
            return false;
        }
    },

    logout: () => {
        localStorage.removeItem('token')
        set({ user: null, token: null, authStatus: 'not-authenticated' })
    },

    checkAuthStatus: async () => {
        try {
            const { user, token } = await checkAuthAction()
            set({ user: user, token: token, authStatus: 'authenticated' })
            return true;
        } catch (error) {
            set({ user: undefined, token: undefined, authStatus: 'not-authenticated' })
            return false;
        }
    },

    register: async (email: string, password: string, fullName: string) => {
        try {
            const data = await registerAction(email, password, fullName);
            localStorage.setItem('token', data.token)
            set({ user: data.user, token: data.token, authStatus: 'authenticated' })
            return true;
        } catch (error) {
            localStorage.removeItem('token')
            set({ user: null, token: null, authStatus: 'not-authenticated' })
            return false;
        }
    },

}))

