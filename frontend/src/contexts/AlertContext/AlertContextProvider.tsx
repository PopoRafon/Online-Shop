import { createContext, useState } from 'react';

export type AlertData = {
    show: boolean;
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
    const [alert, setAlert] = useState<AlertData>({ show: false, text: '' });

    return (
        <AlertContext.Provider value={{ alert, setAlert }}>
            {children}
        </AlertContext.Provider>
    );
}
