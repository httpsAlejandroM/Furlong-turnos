import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from '../firebase';

type AuthContextType = {
    user: string | null;
    isAuthenticated: boolean;
    login: (username: string) => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

    const login = (username: string) => {
        setUser(username);        
        setIsAuthenticated(true)
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false)
    };

    useEffect(() => {
        const auth = getAuth(app);
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                login(user.refreshToken);
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe()
    }, []);

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe usarse dentro de un AuthProvider');
    }
    return context;
};