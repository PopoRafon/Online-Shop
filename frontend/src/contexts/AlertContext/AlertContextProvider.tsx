import { createContext, useState } from 'react';

export type AlertData = {
    show: boolean;
    type: 'success' | 'error';
    text: string;
}

type AlertContextData = {
    alert: AlertData;
    setAlert: React.Dispatch<React.SetStateAction<AlertData>>;
}

export const AlertContext = createContext<AlertContextData | null>(null);

type AlertProviderProps = {
    children: React.ReactNode;
}

export default function AlertContextProvider({ children }: AlertProviderProps) {
    const [alert, setAlert] = useState<AlertData>({ show: false, type: 'success', text: '' });

    return (
        <AlertContext.Provider value={{ alert, setAlert }}>
            {children}
        </AlertContext.Provider>
    );
}
