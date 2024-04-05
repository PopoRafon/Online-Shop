import { Navigate } from 'react-router-dom';
import useUserContext from '@contexts/UserContext/useUserContext';

type ProtectedRouteProps = {
    children: JSX.Element;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    const { user } = useUserContext();

    if (!user.isLoggedIn) {
        return <Navigate to="/" />;
    }

    return children;
}
