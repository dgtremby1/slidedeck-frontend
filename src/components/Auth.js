// Import CSS
// Import major dependencies
import React, { useState, createContext, useEffect } from "react";
// Import components
// Import icons
// Import API and static content
import storage from "../static/storage";

const AuthContext = createContext();

const makeUser = (name, role, token, loggedIn) => {
    const user = {
        name: name,
        role: role,
        token: token,
        loggedIn: loggedIn
    }

    return user;
}

const AuthProvider = (props) => {

    const lastUser = storage.get("last-user");
    const defaultUser = Auth.defaultUser;
    const [user, setUser] = useState(lastUser ? lastUser : defaultUser);

    useEffect(() => {
        storage.set("last-user", user);
        console.log(storage.getKeys());
    }, [user]);

    return (
        <AuthContext.Provider value={{
            user: user,
            setUser: setUser
        }}>
            {props.children}
        </AuthContext.Provider>
    )

}

const Auth = {
    Context: AuthContext,
    Provider: AuthProvider,
    defaultUser: makeUser(undefined, undefined, undefined, false),
    makeUser: makeUser
}

export default Auth;