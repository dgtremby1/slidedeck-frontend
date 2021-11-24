// Import CSS
import "./css/Page.css";
// Import major dependencies
import React from "react";
// Import components
// Import icons
// Import API and static content

const Page = (props) => {

    return(
        <div className={"page " + (props.className ? props.className : "")}>
            {props.children}
        </div>
    )

}

export default Page;