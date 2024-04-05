import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUserData } from '@utils/userData';
import useUserContext from '@contexts/UserContext/useUserContext';
import ProtectedRoute from '@components/Routes/ProtectedRoute';
import AlertContextProvider from '@contexts/AlertContext/AlertContextProvider';
import AccessToken from '@utils/accessToken';
import obtainCSRFToken from '@utils/csrfToken';
import Navigation from '@components/Navigation/Navigation';
import Alert from '@components/Alert/Alert';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Cart from './pages/Cart';
import PasswordReset from './pages/PasswordReset';
import PasswordResetConfirm from './pages/PasswordResetConfirm';
import Error from './pages/Error';
import MyProducts from './pages/MyProducts';
import MyProductsAddProduct from './pages/MyProductsAddProduct';

function App() {
    const { setUser } = useUserContext();
    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            await obtainCSRFToken();
            await AccessToken.refreshToken();
            await getUserData({ setUser });

            setIsLoaded(true);
        })();
    }, [setUser]);

    return isLoaded && (
        <BrowserRouter>
            <AlertContextProvider>
                <Alert />
                <Navigation />
                <Routes>
                    <Route path='/'>
                        <Route index element={<Home />} />
                        <Route path='register' element={<Register />} />
                        <Route path='login' element={<Login />} />
                        <Route path='cart' element={<Cart />} />
                        <Route path='my-products/'>
                            <Route index element={
                                <ProtectedRoute>
                                    <MyProducts />
                                </ProtectedRoute>
                            } />
                            <Route path='add/product' element={
                                <ProtectedRoute>
                                    <MyProductsAddProduct />
                                </ProtectedRoute>
                            } />
                        </Route>
                        <Route path='password/'>
                            <Route path='reset' element={<PasswordReset />} />
                            <Route path='reset/confirm/:uidb64/:token' element={<PasswordResetConfirm />} />
                        </Route>
                    </Route>
                    <Route path='*' element={<Error />} />
                </Routes>
            </AlertContextProvider>
        </BrowserRouter>
    );
}

export default App;
