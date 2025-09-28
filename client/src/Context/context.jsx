import { createContext, useState } from "react";

export const userContext = createContext();

export const UserContextProvider = (props) => {
    const [isLogin,setIsLogin] = useState(null);
    const [user,setUser] = useState();
    const value={
        isLogin,
        setIsLogin,
        user,
        setUser
    }
    return(
        <userContext.Provider value={value}> 
            {props.children}
        </userContext.Provider>
    )
}
