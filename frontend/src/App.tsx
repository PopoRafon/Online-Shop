import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUserData } from '@utils/userData';
import Currency from '@helpers/currency';
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
import PasswordChange from '@pages/PasswordChange';
import Error from './pages/Error';
import MyProducts from './pages/MyProducts';
import MyProductsAddProduct from './pages/MyProductsAddProduct';
import MyProductsEditProduct from '@pages/MyProductsEditProduct';
import Product from './pages/Product';
import Reviews from './pages/Reviews';
import Search from './pages/Search';
import Settings from '@pages/Settings';

function App() {
    const { setUser } = useUserContext();
    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            Currency.initCurrency(setUser);
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
                        <Route path='product/:id/'>
                            <Route index element={<Product />} />
                            <Route path='reviews' element={<Reviews />} />
                        </Route>
                        <Route path='search' element={<Search />} />
                        <Route path='settings' element={
                            <ProtectedRoute>
                                <Settings />
                            </ProtectedRoute>
                        } />
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
                            <Route path='edit/product/:id' element={
                                <ProtectedRoute>
                                    <MyProductsEditProduct />
                                </ProtectedRoute>
                            } />
                        </Route>
                        <Route path='password/'>
                            <Route path='reset' element={<PasswordReset />} />
                            <Route path='reset/confirm/:uidb64/:token' element={<PasswordResetConfirm />} />
                            <Route path='change' element={
                                <ProtectedRoute>
                                    <PasswordChange />
                                </ProtectedRoute>
                            } />
                        </Route>
                    </Route>
                    <Route path='*' element={<Error />} />
                </Routes>
            </AlertContextProvider>
        </BrowserRouter>
    );
}

export default App;
