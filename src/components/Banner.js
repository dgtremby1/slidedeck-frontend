// Import CSS
import "./css/Banner.css"
// Import major dependencies
import React from "react";
// Import components
// Import icons
import { MdError } from "react-icons/md";
import { FaTimes } from "react-icons/fa";
// Import API and static content

const Banner = (props) => {

    return (
        <div className={"banner " + (props.show ? "show" : "hidden")}>
            <button onClick={props.dismiss} className="banner-close" title="dismiss alert">
                <FaTimes className="h-4 w-4"/>
            </button>
            <div className="flex-grow"/>
            <div className="text-current mr-2">
                <div className="bg-white bg-opacity-25 h-4 w-4 -mb-4 rounded-full animate-ping"/>
                <MdError className="h-4 w-4 text-white"/>
            </div>
            <p className="truncate">{props.children}</p>
            <div className="flex-grow"/>
            <div className="w-12"/>
        </div>
    )
}

export default Banner;