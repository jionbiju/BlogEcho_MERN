import { createContext, useState, useEffect } from "react";
import { getMe } from "../api/userServices";

export const userContext = createContext();

export const UserContextProvider = ({ children }) => {
    const [isLogin, setIsLogin] = useState(false);
    const [user, setUser] = useState(null);
    const [authLoading, setAuthLoading] = useState(true);

    // On mount: check if the user has a valid session cookie
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const data = await getMe();
                if (data) {
                    setUser(data);
                    setIsLogin(true);
                }
            } catch {
                // not logged in — that's fine
            } finally {
                setAuthLoading(false);
            }
        };
        checkAuth();
    }, []);

    const value = {
        isLogin,
        setIsLogin,
        user,
        setUser,
        authLoading
    };

    return (
        <userContext.Provider value={value}>
            {children}
        </userContext.Provider>
    );
};
