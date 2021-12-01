// Import CSS
import "./css/FileBrowser.css";
// Import major dependencies
import React, { useContext, useEffect, useState } from "react";
// Import components
import Auth from "./Auth";
import ButtonGroup from "./ButtonGroup";
import Button from "./Button";
import FileIcon from "./FileIcon";
import LoadSpinner from "./LoadSpinner";
// Import icons
import { RiListCheck2, RiListCheck } from "react-icons/ri";
import { FaThumbsUp, FaChevronDown, FaChevronRight } from "react-icons/fa";
// Import API and static content
import api from "../static/api";
import Banner from "./Banner";

const BrowserPath = (props) => {
    const tokens = props.path.split("/");
    const fullPath = [];
    let key = 0;
    for (let i = 0; i < tokens.length; i++) {
        const suffix = props.fileCount === 1 ? "item" : "items";
        const count = i === tokens.length-1 ? `${tokens[i]}: ${props.fileCount} ${suffix}` : `${tokens[i]}`;
        const directory = <p key={key++} className="directory subtitle">{count}</p>;
        const separator = <FaChevronRight key={key++} className="slash"/>;
        fullPath.push(directory);
        if (i < tokens.length-1) fullPath.push(separator);
    }
    return (
        <div className="path-wrapper">{fullPath}</div>
    )
}

const EmptyMessage = () => {
    return (
        <div className="empty-message">
            <FaThumbsUp className="icon"/>
            <div className="divider"/>
            <div className="message">
                <p>Nothing to see here</p>
                <p className="subtitle">
                    No items in this location.
                </p>
            </div>
        </div>
    )
}

const FileBrowser = (props) => {

    const AuthContext = useContext(Auth.Context);
    const [files, setFiles] = useState([]);
    const [active, setActive] = useState(-1);
    const [view, setView] = useState(props.view ? props.view : 0);
    const [loading, setLoading] = useState(false);
    const [bannerShow, setBannerShow] = useState(false);
    const [bannerText, setBannerText] = useState("");
    const fileCount = files.length;
    const type = props.type;
    const from = props.from;
    
    const getFiles = (type, from) => {
        if (from.includes("all")) {
            if (type.includes("template")) {
                // get all templates
                api.get_template(AuthContext.user.token, onGetSuccess);
                setLoading(true);
            }
            if (type.includes("log")) {
                // get all logs
                api.get_log(AuthContext.user.token, onGetSuccess);
                setLoading(true);
            }
        }
        if (from.includes("recent")) {
            if (type.includes("template")) {
                // get recent templates
                setFiles([]);
            }
            if (type.includes("log")) {
                // get recent logs
                setFiles([]);
            }
        }
    }

    const onGetSuccess = (data) => {
        setLoading(false);
        setFiles(data.result);
        // console.log(data);
    }

    const onFileClick = (file, i) => {
        setActive(i);
        if (props.onSelect) {
            props.onSelect(file);
        }
    }

    useEffect(() => {
        if(AuthContext.user.loggedIn) {
            getFiles(type, from);
        } else {
            setBannerShow(true);
            setBannerText("User logged out. Please log back in.");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [from, type]);

    return (
        <div className={"file-browser backdrop " + (view === 0 ? "icons" : "list") + (props.mini ? " mini" : "")}>
            <div className="backdrop-header">
                <span>
                    <p>View as</p>
                    <ButtonGroup active={view} buttons={[
                        <Button 
                            icon={RiListCheck2}
                            onClick={() => {setView(0)}}
                        >Icons</Button>,
                        <Button 
                            icon={RiListCheck}
                            onClick={() => {setView(1)}}
                        >List</Button>
                    ]}/>
                </span>
                <span>
                    <p>Sort by</p>
                    <Button icon={FaChevronDown}>Date Created</Button>
                </span>
                {loading && <LoadSpinner/>}
            </div>
            <div className="-mx-4">
                <Banner show={bannerShow}>{bannerText}</Banner>
            </div>
            {(fileCount > 0) ? 
                <div className="preview-box">
                    {files.map((file, i) => {return(
                        <FileIcon 
                            active={(i == active) ? true : false}
                            onClick={() => {onFileClick(file, i)}} 
                            type={type} 
                            file={file} 
                            key={i}/>
                    )})}
                </div>
                :
                <EmptyMessage/>
            }   
            <div className="browser-path">
                <BrowserPath path={`${from}/${type}`} fileCount={fileCount}/>
            </div>
        </div>
    )

}

export default FileBrowser;