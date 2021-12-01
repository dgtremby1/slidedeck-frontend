// Import CSS
import "./css/FileIcon.css"
// Import major dependencies
import React from "react";
// Import components
// Import icons
// import { ImTable } from "react-icons/im";
// Import API and static content

// const truncate = (string, max) => {
//     // console.log(string, string.length);
//     // return string;
//     let short = "";
//     let hasSpace = false;
//     for (let i = 0; i < string.length; i++) {
//         if (string[i] === " ") {
//             hasSpace = true;
//             break;
//         }
//     }
//     if (hasSpace) {
//         // return string;
//         if (string.length > max) {
//             let foundSpace = false;
//             let startCopy = false;
//             for (let i = max-1; i >= 0; i--) {
//                 if (string[i] === " " && !foundSpace) foundSpace = true;
//                 if (foundSpace && string[i] !== " " && !startCopy) startCopy = true;
//                 if (startCopy) short = string[i] + short;
//             }
//             return short + " ...";
//         } else {
//             return string;
//         }
//     } else {
//         if (string.length > Math.floor(0.33 * max)) {
//             short = string.substring(0, Math.floor(0.33 * max));
//             return short + " ...";
//         } else {
//             return string;
//         }
//     }
    
// }

const FileIcon = (props) => {

    // "log" or "template"
    const type = props.type; 
    const file = props.file;
    const modiDate = new Date(file.touched);
    // const madeDate = new Date(file.created);

    return(
        <button onClick={props.onClick} className={"file-icon log " + (props.active ? "active" : "")}>
            {/* <div className="icon">
                <p className="file-size"></p>
                <p className="file-type">LOG</p>
            </div> */}
            <div className="icon">
                <img alt="Log file icon" src="/assets/log-file-icon.svg"/>
                <div className="type-label">
                    {type[0]}
                </div>
            </div>
            <div className="info">
                <p className="filename">
                    {/* {truncate(props.file.name, 32)} */}
                    {file.name}
                </p>
                <p className="subtitle">
                    {`${modiDate.getMonth()+1}/${modiDate.getDate()}/${modiDate.getFullYear()}`}
                </p>
            </div>
        </button>
    )

}

export default FileIcon;