// Import CSS
// import "./css/PrivateRoute.css";
// Import major dependencies
import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import Auth from "./Auth";
// Import components
// Import icons
// Import API and static content
import storage from "../static/storage";

const PrivateRoute = ( { component: Component, ...rest } ) => {

    const AuthContext = useContext(Auth.Context);
    const currentUser = AuthContext.user.loggedIn;

    return(
        <Route
            {...rest}
            render={props => {
                return currentUser ? <Component {...props}/> : <Redirect to="/login"/>
            }}
        />
    )

}

export default PrivateRoute;