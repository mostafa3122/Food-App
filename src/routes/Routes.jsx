import { createBrowserRouter } from "react-router-dom";
import ForgetPass from "../modules/Authentication/components/ForgetPass/ForgetPass";
import Login from "../modules/Authentication/components/Login/Login";
import Register from "../modules/Authentication/components/Register/Register";
import ResetPass from "../modules/Authentication/components/ResetPass/ResetPass";
import VerifyAccount from "../modules/Authentication/components/VerifyAccount/VerifyAccount";
import CategoriesList from "../modules/Categories/components/CategoriesList/CategoriesList";
import Dashboard from "../modules/Dashboard/components/Dashboard/Dashboard";
import FavList from "../modules/Favourites/components/FavList/FavList";
import RecipesList from "../modules/Recipes/components/RecipesList/RecipesList";
import AuthLayout from "../modules/Shared/components/AuthLayout/AuthLayout";
import MasterLayout from "../modules/Shared/components/MasterLayout/MasterLayout";
import NotFound from "../modules/Shared/components/NotFound/NotFound";
import UserList from "../modules/Users/components/UserList/UserList";
import ChangePass from "../modules/Authentication/components/ChangePass/ChangePass";




export const routes = createBrowserRouter(
    [
        {
            path: '',
            element: <AuthLayout />,
            errorElement: <NotFound />,
            children: [
                { index: true, element: <Login /> },
                { path: 'login', element: <Login /> },
                { path: 'register', element: <Register /> },
                { path: 'forget-password', element: <ForgetPass /> },
                { path: 'reset-password', element: <ResetPass /> },
                { path: 'verify-account', element: <VerifyAccount /> },
            ]
        },
        {
            path: 'dashboard',
            element: <MasterLayout />,
            errorElement: <NotFound />,
            children: [
                { index: true, element: <Dashboard /> },
                { path: '', element: <Dashboard /> },
                { path: 'recipes', element: <RecipesList /> },
                { path: 'categories', element: <CategoriesList /> },
                { path: 'favourites', element: <FavList /> },
                { path: 'users', element: <UserList /> },
            ]

        }
    ]
)