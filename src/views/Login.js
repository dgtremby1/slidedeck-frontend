// Import CSS
import "./css/Login.css";
// Import major dependencies
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Helmet } from "react-helmet-async";
// Import components
import Banner from "../components/Banner";
import Button from "../components/Button";
import TextBox from "../components/TextBox";
import LoadSpinner from "../components/LoadSpinner";
import Auth from "../components/Auth";
// Import icons
import { FaUserAlt, FaLock, FaChevronRight } from "react-icons/fa";
// Import API
import api from "../static/api";

const Login = (props) => {

    const AuthContext = useContext(Auth.Context);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [showError, setShowError] = useState(false);
    const history = useHistory();

    const onUsernameChange = (e) => {
        let value = e.target.value;
        setUsername(value);
        setShowError(false);
    }

    const onPasswordChange = (e) => {
        let value = e.target.value;
        setPassword(value);
        setShowError(false);
    }

    const handleLoginButton = () => {
        setLoading(true);
        const user = {
            name: username,
            password: password,
        }
        api.put_login(user, onSuccess);
    }

    const onSuccess = (data) => {
        console.log(data);
        setLoading(false);
        if (data.result) {
            const newUser = { ...data.user };
            newUser.loggedIn = true;
            AuthContext.setUser(newUser);
            history.push("/dashboard/home");
        } else {
            AuthContext.setUser(Auth.defaultUser);
            setShowError(true);
        }
    }

    return(
        <>  
            <Helmet>
                <title>Welcome</title>
            </Helmet>
            <Banner dismiss={() => {setShowError(false)}} show={showError}>
                Invalid username and/or password. Please try again.
            </Banner>
            <div className="auth-background">
                <div className="auth-card">
                    <div className="h-12"/>
                    <div className="flex justify-center">
                        <img 
                            alt="Slidedeck logo"
                            src="/assets/slidedeck-logo.svg" 
                            className="w-52 light-logo"
                        />
                        <img 
                            alt="Slidedeck logo"
                            src="/assets/slidedeck-logo-w.svg" 
                            className="w-52 dark-logo"
                        />
                    </div>
                    <div className="h-12"/>
                    <div className="h-4"/>
                    <TextBox 
                        icon={FaUserAlt}
                        className="w-full"
                        type="text"
                        placeholder="username" 
                        onChange={onUsernameChange}
                    />
                    <div className="h-2"/>
                    <TextBox 
                        icon={FaLock}
                        className="w-full"
                        type="password"
                        placeholder="password" 
                        onChange={onPasswordChange}
                    />
                    <div className="h-4"/>
                    {loading ? 
                        <div className="w-full flex justify-center items-center">
                            <LoadSpinner/>
                        </div>
                        :
                        <Button id="login"
                            disabled={!username || !password}  
                            className="special center w-full font-bold" 
                            icon={FaChevronRight}
                            onClick={handleLoginButton}>
                            LOG IN
                        </Button>
                    }
                    <div className="h-4"/>
                    <div className="text-center">
                        <p className="text-sm underline text-theme hover:text-carolina cursor-pointer">Forgot Password?</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;