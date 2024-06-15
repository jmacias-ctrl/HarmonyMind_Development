import React, { createContext, useContext, useState, ReactNode } from "react";

const TOKEN_LOCALSTORAGE_VARIABLE = 'token';

interface IAuthProvider {
    isLogged: boolean;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<IAuthProvider | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [isLogged, setIsLogged] = useState(!!localStorage.getItem(TOKEN_LOCALSTORAGE_VARIABLE));

    const login = (token: string) => {
        localStorage.setItem(TOKEN_LOCALSTORAGE_VARIABLE, token);
        setIsLogged(true);
    }

    const validateToken = async () => {
        const validateResponse = await fetch('')
        const response = validateResponse.json();
        const timestamp: Date = new Date();
        const isExpired = timestamp > new Date();
        logout()
    }

    const logout = () => {
        localStorage.removeItem(TOKEN_LOCALSTORAGE_VARIABLE);
        setIsLogged(false);
    }

    return (
        <AuthContext.Provider value={{ isLogged, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
