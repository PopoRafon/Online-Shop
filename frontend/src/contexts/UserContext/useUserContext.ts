import { useContext } from 'react';
import { UserContext } from './UserContextProvider';

export default function useUserContext() {
    const context = useContext(UserContext);

    if (context === null) {
        throw new Error('User context should be used within UserContextProvider.');
    }

    return context;
}
