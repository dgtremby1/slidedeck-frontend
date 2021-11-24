// Import CSS
import "./css/Button.css";
// Import major dependencies
import React, { useRef, useState } from "react";
// Import components
import FX from "./FX";
// Import icons
// Import API and static content

const Button = (props) => {

    // For Ripple FX
    const [ripple, setRipple] = useState(FX.Ripple.util.defaultState());
    const ref = useRef();
    const onMouseDown = (e) => {
        setRipple(FX.Ripple.util.startState(e, ref));
    }
    const onMouseUp = (e) => {
        setRipple(FX.Ripple.util.stopState(e, ref));
    }
    // End Ripple FX
    return(
        <button 
            title={props.title}
            ref={ref}
            disabled={props.disabled}
            className={"button " + props.className}
            onClick={props.onClick}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
        >   
            <FX.Ripple.Component state={ripple}/>
            {props.icon &&
                <div className="icon">
                    <props.icon className="h-full w-full"/>
                </div>    
            }
            <p className="flex-grow">
                {props.children}
            </p>
        </button>
    );
    
}

export default Button;