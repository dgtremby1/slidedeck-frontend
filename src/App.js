// Import CSS
import './App.css';
// Import major dependencies
import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom"
import { HelmetProvider } from 'react-helmet-async';
// Import components
import Dashboard from './views/Dashboard';
import Login from './views/Login';
import Signup from './views/Signup';
import Theme from './components/Theme';
import Auth from './components/Auth';
import PrivateRoute from './components/PrivateRoute';
// Import icons
// Import API and static content

const App = () => {

    return(
        <HelmetProvider>
            <Auth.Provider>
                <Theme.Provider theme={Theme.list[1]}>
                    <div className="App"> 
                        <BrowserRouter>
                            <Switch>
                                <Route exact path="/">
                                    <Redirect to="/login"/>
                                </Route>
                                <Route exact path="/login" component={Login}/>
                                <Route exact path="/signup" component={Signup}/>
                                <PrivateRoute path="/dashboard" component={Dashboard.Page}/>
                            </Switch>
                        </BrowserRouter>
                    </div>
                </Theme.Provider>   
            </Auth.Provider>
        </HelmetProvider>
    )
}

export default App;
