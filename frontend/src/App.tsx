import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AlertContextProvider from '@contexts/AlertContext/AlertContextProvider';
import AccessToken from '@utils/accessToken';
import obtainCSRFToken from '@utils/csrfToken';
import Navigation from '@components/navigation/Navigation';
import Alert from '@components/alert/Alert';
import Home from './pages/Home';
import Register from './pages/Register';

function App() {
    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            await obtainCSRFToken();
            await AccessToken.refreshToken();

            setIsLoaded(true);
        })();
    }, []);

    return isLoaded && (
        <BrowserRouter>
            <AlertContextProvider>
                <Alert />
                <Navigation />
                <Routes>
                    <Route path='/'>
                        <Route index element={<Home />} />
                        <Route path='register' element={<Register />} />
                    </Route>
                </Routes>
            </AlertContextProvider>
        </BrowserRouter>
    );
}

export default App;
