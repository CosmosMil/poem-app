import { useState } from "react";
import { createContext } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
    
    const [user, setUser] = useState(null);

    const logIn = (email, password) => {
        const newUser = {
            email: email,
            password: password
        }
        setUser(newUser);
        console.log('user logged in')
        console.log(user)
    }

    const logOut = () => {
        setUser(null);
        console.log('user logged out')
    }


    console.log('current user: ', user);

    return (
        <AuthContext.Provider value={{ user, logIn, logOut }}>
            {props.children}
        </AuthContext.Provider>
    )
}

