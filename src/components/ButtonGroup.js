// Import CSS
import "./css/ButtonGroup.css";
// Import major dependencies
import React from "react";
// Import components

// Import icons
// Import API and static content

const ButtonGroup = (props) => {

    // const [active, setActive] = useState(props.active ? props.active : 0);
    const active = props.active;

    return(
        <div className="button-group">
            {props.buttons.map((button, i) => {return(
                <div 
                    key={i} 
                    className={"button-wrapper " + (i === active ? "active" : "")}
                >
                    {button}
                </div>
            )})}
        </div>
    )

}

export default ButtonGroup;