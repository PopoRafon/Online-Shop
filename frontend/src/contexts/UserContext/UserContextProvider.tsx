import type { CurrencyType } from '@helpers/currency';
import { useState, createContext } from 'react';

export type User = {
    isLoggedIn: boolean;
    username: string;
    email: string;
    currency: CurrencyType;
}

type UserContextData = {
    user: User;
    setUser: React.Dispatch<React.SetStateAction<User>>;
}

export const UserContext = createContext<UserContextData | null>(null);

type UserContextProiderProps = {
    children: React.ReactNode;
}

export default function UserContextProvider({ children }: UserContextProiderProps) {
    const [user, setUser] = useState<User>({
        isLoggedIn: false,
        username: '',
        email: '',
        currency: {
            symbol: '',
            multiplier: 0
        }
    });

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}
