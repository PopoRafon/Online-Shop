import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Navigation from './components/navigation/Navigation';
import Footer from '@components/footer/Footer';
import Home from './pages/Home';

function App() {
    return (
        <BrowserRouter>
            <Navigation />
            <Routes>
                <Route path='/'>
                    <Route index element={<Home />} />
                </Route>
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
