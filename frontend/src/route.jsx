import { createBrowserRouter } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Transfer from './pages/TransferExchange';

const router = createBrowserRouter([
    {
        path : "/",
        element : <Dashboard />
    },
    {
        path : "/signup",
        element : <Signup />
    },
    {
        path : "/signin",
        element : <Signin />
    },
    {
        path : "/transfer",
        element : <Transfer />
    }
])

export default router