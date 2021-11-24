// Import CSS
// Import major dependencies
import React from "react";
// Import components
// Import icons
// Import API and static content

import { CgSpinner } from "react-icons/cg";

const LoadSpinner = (props) => {

    return (
        <div className="w-8 h-8 animate-spin">
            <CgSpinner className="text-carolina w-full h-full"/>
        </div>
    )

}

export default LoadSpinner;