import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Navigation from './components/navigation/Navigation';
import Home from './pages/Home';
import Register from './pages/Register';

function App() {
    return (
        <BrowserRouter>
            <Navigation />
            <Routes>
                <Route path='/'>
                    <Route index element={<Home />} />
                    <Route path='register' element={<Register />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
