import React, { useState, createContext } from 'react';

export type User = {
    isLoggedIn: boolean;
    username: string;
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
    const [user, setUser] = useState<User>({ isLoggedIn: false, username: '' });

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}
