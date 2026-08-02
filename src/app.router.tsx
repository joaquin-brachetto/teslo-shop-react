import { lazy } from "react"
import { createBrowserRouter, Navigate } from "react-router"
import { DashboardPage } from "./admin/pages/dashboard/DashboardPage"
import { AdminProductPage } from "./admin/pages/product/AdminProductPage"
import { AdminProductsPage } from "./admin/pages/products/AdminProductsPage"
import { LoginPage } from "./auth/pages/login/LoginPage"
import { RegisterPage } from "./auth/pages/register/RegisterPage"
import { AdminRoute, ProtectedRoute } from "./components/routes/ProtectedRoute"
import { ShopLayout } from "./shop-frontend/layouts/ShopLayout"
import { GenderPage } from "./shop-frontend/pages/gender/GenderPage"
import { HomePage } from "./shop-frontend/pages/home/HomePage"
import { ProductPage } from "./shop-frontend/pages/product/ProductPage"

const AuthLayout = lazy(() => import('./auth/layouts/AuthLayout'))
const AdminLayout = lazy(() => import('./admin/layouts/AdminLayout'))

export const appRouter = createBrowserRouter([

    // Rutas Main
    {
        path: '/',
        element: <ShopLayout />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: 'product/:idSlug',
                element: <ProductPage />
            },
            {
                path: 'gender/:gender',
                element: <GenderPage />
            }
        ]
    },

    // Rutas Auth

    {
        path: '/auth',
        element: <ProtectedRoute>
            <AuthLayout />
        </ProtectedRoute>,
        children: [
            {
                index: true,
                element: <Navigate to="auth/login" />
            },
            {
                path: 'login',
                element: <LoginPage />
            },
            {
                path: 'register',
                element: <RegisterPage />
            },
        ]
    },

    // Rutas Admin

    {
        path: '/admin',
        element: <AdminRoute>
            <AdminLayout />
        </AdminRoute>,
        children: [
            {
                index: true,
                element: <DashboardPage />
            },
            {
                path: 'products',
                element: <AdminProductsPage />
            },
            {
                path: 'products/:id',
                element: <AdminProductPage />
            }
        ]
    },
    {
        path: '*',
        element: <Navigate to='/' />
    }




]
)
