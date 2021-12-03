// Import CSS
import "./css/FileIcon.css"
// Import major dependencies
import React, { useEffect } from "react";
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
    const modifiedDate = new Date(file.touched);
    const createdDate = new Date(file.created);
    const modifiedDateString = `${modifiedDate.getMonth()+1}/${modifiedDate.getDate()}/${modifiedDate.getFullYear()}`;
    const createdDateString = `${createdDate.getMonth()+1}/${createdDate.getDate()}/${createdDate.getFullYear()}`;
    let fileSubtitle;
    let rows;
    let cols;

    // useEffect(() => {
        switch (type) {
            case "log":
                fileSubtitle = file.slides.length + " slide" + (file.slides.length === 1 ? "" : "s");
                rows = file.slides.length;
                cols = ""
                break;
            case "template":
                fileSubtitle = file.headers.length + " column" + (file.headers.length === 1 ? "" : "s");
                cols = file.headers.length;
                rows = ""
                break;
            default:
                fileSubtitle = modifiedDateString;
                break;
        }
        // console.log(file);
    // }, [])
    
    // const madeDate = new Date(file.created);

    return(
        <button 
            title={`${type} - ${file.name}`}
            onClick={props.onClick} 
            className={"file-icon log " + (props.active ? "active" : "")}
        >
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
                <div className="list-file-info">
                    <p className="subtitle capitalize">{type}</p>
                    <p className="subtitle text-center">{rows}</p>
                    <p className="subtitle text-center">{cols}</p>
                    <p className="subtitle text-center">{modifiedDateString}</p>
                    <p className="subtitle text-center">{createdDateString}</p>
                </div>
                <div className="icon-file-info">
                    <p className="subtitle">
                        {fileSubtitle}
                    </p>
                </div>
            </div>
        </button>
    )

}

export default FileIcon;