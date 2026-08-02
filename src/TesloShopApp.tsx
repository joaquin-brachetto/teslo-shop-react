import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import type { PropsWithChildren } from 'react'
import { RouterProvider } from "react-router"
import { Toaster } from 'sonner'
import { appRouter } from "./app.router"
import { useAuthState } from './auth/store/auth.action'
import { CustomFullScreenLoading } from './components/custom/CustomFullScreenLoading'


const queryClient = new QueryClient()

const CheckAuthProvider = ({ children }: PropsWithChildren) => {

    const { checkAuthStatus } = useAuthState()

    const { isLoading } = useQuery({
        queryKey: ['auth'],
        queryFn: checkAuthStatus,
        retry: false,
        refetchInterval: 1000 * 60 * 1.5,
        refetchOnWindowFocus: true,
    })

    if (isLoading) return <CustomFullScreenLoading />

    return children
}


export const TesloShop = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <Toaster />
            <CheckAuthProvider>
                <RouterProvider router={appRouter} />
            </CheckAuthProvider>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    )
}
