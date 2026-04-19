
import { RouterProvider } from 'react-router-dom'
import './App.css'
import { routes } from './routes/Routes'
import { ToastContainer } from 'react-toastify'
function App() {

  return (
    <>
      <RouterProvider router={routes}></RouterProvider>
      <ToastContainer position="top-right" autoClose={2000} />
    </>
  )
}

export default App
