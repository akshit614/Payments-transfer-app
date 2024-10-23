import { createBrowserRouter } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Transfer from './pages/TransferExchange';

const router = createBrowserRouter([
    {
        path : "/",
        element : <Signup />
    },
    {
        path : "/dashboard",
        element : <Dashboard />
    },
    {
        path : "/signin",
        element : <Signin />
    },
    {
        path : "/transfer",
        element : <Transfer />
    },
    {
        path : "/signup",
        element : <Signup />
    }
])

export default router