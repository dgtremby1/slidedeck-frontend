// Import CSS
import "./css/Signup.css";
// Import major dependencies
import React, { useRef, useState } from "react";
// import { useHistory } from "react-router-dom";
import { Helmet } from "react-helmet-async";
// Import components
import Banner from "../components/Banner";
import Button from "../components/Button";
import TextBox from "../components/TextBox";
import Upload from "../components/Upload";
import LoadSpinner from "../components/LoadSpinner";
import Auth from "../components/Auth";
// Import icons
import { BsFillPersonLinesFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { FaUserAlt, FaLock, FaChevronRight } from "react-icons/fa";
// Import API
import api from "../static/api";
// Import signature box
import SignaturePad from "react-signature-canvas";

const Signup = (props) => {

    let signature = useRef({});
    const [userSignature, setUserSignature] = useState(null)

    const saveSignature = ()=> {
        setUserSignature(signature.current.toData());
    }
    console.log(userSignature);
    return (
        <>  
            <Helmet>
                <title>Welcome</title>
            </Helmet>
            <Banner>
                Invalid username and/or password. Please try again.
            </Banner>
            <div className="auth-background">
                <div className="auth-window">
                    <div className="auth-logo">
                        <img 
                            alt="Slidedeck logo"
                            src="/assets/slidedeck-logo.svg" 
                            className="w-52"
                        />
                    </div>
                    <div className="auth-columns">
                        <div className="auth-col">
                            <span>
                                <TextBox 
                                    icon={BsFillPersonLinesFill}
                                    className="w-full"
                                    type="text"
                                    placeholder="Full Name" 
                                />
                                <TextBox 
                                    icon={MdEmail}
                                    className="w-full"
                                    type="text"
                                    placeholder="Email" 
                                />
                            </span>
                            <Upload title="Upload Signature" subtitle="Attach Image"/>
                        </div>
                        <div className="auth-col">
                            <span>
                                <TextBox 
                                    icon={FaUserAlt}
                                    className="w-full"
                                    type="text"
                                    placeholder="Username" 
                                />
                                <TextBox 
                                    icon={FaLock}
                                    className="w-full"
                                    type="password"
                                    placeholder="Password" 
                                />
                            </span>
                            <TextBox 
                                icon={FaLock}
                                className="w-full"
                                type="password"
                                placeholder="Confirm Password" 
                            />
                            <div className="flex-grow"/>
                            <TextBox 
                                icon={FaLock}
                                className="w-full"
                                type="password"
                                placeholder="One Time Code" 
                            />
                            <Button icon={FaChevronRight} className="special">SIGN UP</Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Signup;