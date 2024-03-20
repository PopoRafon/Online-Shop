import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUserData } from '@utils/userData';
import useUserContext from '@contexts/UserContext/useUserContext';
import AlertContextProvider from '@contexts/AlertContext/AlertContextProvider';
import AccessToken from '@utils/accessToken';
import obtainCSRFToken from '@utils/csrfToken';
import Navigation from '@components/Navigation/Navigation';
import Alert from '@components/Alert/Alert';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';

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
                    </Route>
                </Routes>
            </AlertContextProvider>
        </BrowserRouter>
    );
}

export default App;
