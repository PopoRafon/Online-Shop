import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Navigation from './components/navigation/Navigation';
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
        </BrowserRouter>
    );
}

export default App;
