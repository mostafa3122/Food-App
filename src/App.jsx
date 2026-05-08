import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './App.css';
import ForgetPass from './modules/Authentication/components/ForgetPass/ForgetPass';
import Login from './modules/Authentication/components/Login/Login';
import Register from './modules/Authentication/components/Register/Register';
import ResetPass from './modules/Authentication/components/ResetPass/ResetPass';
import VerifyAccount from './modules/Authentication/components/VerifyAccount/VerifyAccount';
import CategoriesList from './modules/Categories/components/CategoriesList/CategoriesList';
import Dashboard from './modules/Dashboard/components/Dashboard/Dashboard';
import FavList from './modules/Favourites/components/FavList/FavList';
import AddRecipe from './modules/Recipes/components/AddRecipe/AddRecipe';
import EditRecipe from './modules/Recipes/components/EditRecipe/EditRecipe';
import RecipesList from './modules/Recipes/components/RecipesList/RecipesList';
import AuthLayout from './modules/Shared/components/AuthLayout/AuthLayout';
import MasterLayout from './modules/Shared/components/MasterLayout/MasterLayout';
import NotFound from './modules/Shared/components/NotFound/NotFound';
import ProtectedRoute from './modules/Shared/components/ProtectedRoute/ProtectedRoute';
import UserList from './modules/Users/components/UserList/UserList';
function App() {

  const routes = createBrowserRouter(
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
        element: <ProtectedRoute > <MasterLayout /></ProtectedRoute>,
        errorElement: <NotFound />,
        children: [
          { index: true, element: <Dashboard /> },
          { path: '', element: <Dashboard /> },
          {
            path: 'categories', element: (
              <ProtectedRoute allowedRoles={['SuperAdmin' || "Admin"]}>
                <CategoriesList />
              </ProtectedRoute>
            )
          },
          {
            path: 'users',
            element: (
              <ProtectedRoute allowedRoles={['SuperAdmin' || "Admin"]}>
                <UserList />
              </ProtectedRoute>
            )
          },
          {
            path: 'favourites',
            element: (
              <ProtectedRoute allowedRoles={['SystemUser']}>
                <FavList />
              </ProtectedRoute>
            )
          },

          {
            path: 'edit-recipe/:id',
            element: (
              <ProtectedRoute allowedRoles={['SuperAdmin' || "Admin"]}>
                <EditRecipe />
              </ProtectedRoute>
            )
          },
          {
            path: 'add-recipe',
            element: (
              <ProtectedRoute allowedRoles={['SuperAdmin' || "Admin"]}>
                <AddRecipe />
              </ProtectedRoute>
            )
          },
          { path: 'recipes', element: <RecipesList /> },
        ]

      }
    ]
  )
  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />
      <RouterProvider router={routes}></RouterProvider>
    </>
  )
}

export default App
