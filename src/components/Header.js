// Import CSS
import './css/Header.css';
// Import major dependencies
import React from "react";
// Import components
// Import icons
// Import API and static content

const Header = (props) => {

    return(
        <>
            <div className="header">
                <div className="header-content">
                    {/* <ThemeSwitcher/> */}
                    {/* <TextBox icon={FaSearch} placeholder="Search ..."/>
                    <Button>
                        Notifications
                    </Button> */}
                    {props.children}
                </div>
                <div className="header-gradient"></div>
            </div>
            
        </>
    )
    
}

export default Header;