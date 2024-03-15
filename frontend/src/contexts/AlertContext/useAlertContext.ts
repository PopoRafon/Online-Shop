import { useContext } from 'react';
import { AlertContext } from './AlertContextProvider';

export default function useAlertContext() {
    const context = useContext(AlertContext);

    if (context === null) {
        throw new Error('Alert context should be used within AlertContextProvider.');
    }

    return context;
}
