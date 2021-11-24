// Import CSS
// Import major dependencies
import React, { useContext } from "react";
// Import components
import Theme from "./Theme";
import Button from "./Button";
import ButtonGroup from "./ButtonGroup";
// Import icons
// Import API and static content

const ThemeSwitcher = (props) => {
    
    const themeContext = useContext(Theme.Context);
    const buttons = [];
    const changeTheme = (index) => {
        themeContext.setTheme(Theme.list[index]);
    }
    Theme.list.map((theme, i) => {return(
        buttons.push(
            <Button 
                key={i}
                icon={theme.icon}
                onClick={() => {changeTheme(i)}}
            >
                {theme.name}
            </Button>
        )
    )});
    return(
        <div>
            <ButtonGroup active={themeContext.theme.index} buttons={buttons}/>
        </div>
    )

}

export default ThemeSwitcher;