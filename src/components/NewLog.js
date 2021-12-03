// Import CSS
import "./css/NewLog.css";
// Import major dependencies
import React, { useContext, useState, useEffect } from "react";
// Import components
import FileBrowser from "./FileBrowser";
import TextBox from "./TextBox";
import Auth from "./Auth";
import LoadSpinner from "./LoadSpinner";
import Button from "./Button";
import Banner from "./Banner";
// Import icons
import { FaCheck, FaRegHandPointer } from "react-icons/fa";
import { MdOutlineTableRows, MdOutlineViewColumn } from "react-icons/md"
// Import API and static content
import api from "../static/api";
import utils from "../static/utils";

const NewLog = (props) => {

    const AuthContext = useContext(Auth.Context);

    const [selectedTemplate, setSelectedTemplate] = useState(undefined);
    const [newLogName, setNewLogName] = useState("New Log");
    const [columns, setColumns] = useState([]);
    const [colDefaults, setColDefaults] = useState([]);
    const [colsLeft, setColsLeft] = useState([]);
    const [colsRight, setColsRight] = useState([]);
    const [types, setTypes] = useState([]);
    const [roles, setRoles] = useState(undefined);
    const [loading, setLoading] = useState(true);
    const [bannerShow, setBannerShow] = useState(false);
    const [bannerText, setBannerText] = useState("An error has occurred.");

    const updateFileName = (e) => {
        const value = e.target.value;
        setNewLogName(value);
    }

    const checkFileName = (e) => {
        const value = e.target.value;
        if (value.length === 0) {
            setBannerText("Log name cannot be blank.");
            setBannerShow(true);
        }
        // setNewLogName(value);
    }

    const appendFileNum = (data) => {
        setLoading(false);
        // console.log(data);
        setNewLogName(`New Log ${data.result.length + 1}`);
    }

    const updateColumnDefault = (i, e) => {
        const value = e.target.value;
        // alert(`${i}: ${value}`);
        setColDefaults((defaults) => {
            const clone = utils.clone(defaults);
            clone[i] = value;
            return clone;
        });
    }

    const onTemplateClick = (file) => {
        // console.log(file);
        let leftRole = file.headers[0][1][1];
        let columns = [];
        let colsLeft = [];
        let colsRight = [];
        let colDefaults = [];
        let leftType = [];
        let rightType = [];
        let types = [];
        for (let i = 0; i < file.headers.length; i++) {
            // console.log(header);
            let name = file.headers[i][0];
            let type = file.headers[i][1][0];
            let role = file.headers[i][1][1];
            columns.push(name);
            types.push(type);
            colDefaults.push("");
            if (role === leftRole) {
                colsLeft.push(name);
            } else {
                colsRight.push(name);
                if (!roles) setRoles([leftRole, role]);
            }
        }
        setSelectedTemplate(file);
        setColumns(columns);
        setColDefaults(colDefaults);
        setColsLeft(colsLeft);
        setColsRight(colsRight);
        setTypes(types);
    }

    const onNewLogSuccess = (data) => {
        // console.log(data);
        props.changeTemplatePage(0);
    }

    const submitNewLog = () => {

        if (!selectedTemplate) {
            setBannerText("No template selected.");
            setBannerShow(true);
        } else if (newLogName.length === 0) {
            setBannerText("Log name cannot be blank");
            setBannerShow(true);
        } else {
            const presets = [];
            for (let i = 0; i < columns.length; i++) {
                presets.push({
                    name: columns[i],
                    value: colDefaults[i]
                });
            }
            const log = {
                template: selectedTemplate.id,
                name: newLogName,
                presets: presets,
                token: AuthContext.user.token
            };
            // console.log(log);
            api.post_log_create(log, onNewLogSuccess);
        }

    }

    useEffect(() => {
        api.get_log(AuthContext.user.token, appendFileNum);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return(
        <div className="new-log">
            <div className="template-select backdrop">
                <div className="backdrop-header">
                    <p className="h-8 flex items-center">Select a template to be used by new log</p>
                    {loading && <LoadSpinner/>}
                </div>
                <div className="-mx-4">
                    <Banner 
                        dismiss={() => {setBannerShow(false)}} 
                        show={bannerShow}
                    >
                        {bannerText}
                    </Banner>
                </div>
                <div className="-mx-4 flex">
                    <div className="template-list">
                        <FileBrowser 
                            mini
                            onSelect={onTemplateClick}
                            view={1} 
                            from="all" 
                            type="template"
                        />
                    </div>
                    <div className="new-log-editor">
                        {!selectedTemplate ?
                            <div className="blank-message">
                                <p className="subtitle italic">
                                    No template selected.
                                </p>
                            </div>
                        :
                            <div>
                                <div className="new-log-header truncate">
                                    <p>Creating</p>
                                    <div className="small-icon">L</div>
                                    <p className="truncate"><b>New Log</b> from</p>
                                    <div className="small-icon">T</div>
                                    <b className="truncate">{selectedTemplate.name}</b>
                                </div>

                                <div className="truncate flex items-center space-x-2 py-2 -my-2">
                                    <p className="truncate">New Log Name</p>
                                    <div className="flex-grow">
                                    <TextBox 
                                        readOnly={!AuthContext.user.loggedIn || loading}
                                        value={newLogName} 
                                        onChange={updateFileName}
                                        onBlur={checkFileName}
                                        type="text" 
                                        placeholder="New Log Name"
                                        className="w-full"
                                    />
                                    </div>
                                </div>
                                <div className="flex items-center justify-center my-4">
                                    
                                    <p className="subtitle italic flex items-center">
                                        <MdOutlineViewColumn className="transform rotate-180 mr-1"/>
                                        Chosen template has {columns.length} {columns.length == 1 ? "column" : "columns"}. Set default values below.
                                        <FaRegHandPointer className="transform rotate-180 ml-1"/>
                                    </p>
                                </div>
                                <div className="columns-preview">
                                    <div className="cols-left">
                                        <div className="side-header">
                                            To be completed by {roles[0]}
                                        </div>
                                        <div className="cols-wrapper">
                                            {colsLeft.map((colName, i) => {return(
                                                <div key={i} className="template-col">
                                                    <div className="col-name">
                                                        <p className="truncate">{colName}</p>
                                                    </div>
                                                    <TextBox
                                                        onChange={(e) => updateColumnDefault(i, e)}
                                                        value={colDefaults[i]}
                                                        type={types[i] === "number" ? "number" : "text"}
                                                        placeholder={`Default ${types[i]}`} 
                                                        className="w-full text-carolina"
                                                    />
                                                </div>
                                            )})}
                                        </div>
                                    </div>
                                    <div className="cols-right">
                                        <div className="side-header">
                                            To be completed by {roles[1]}
                                        </div>
                                        <div className="cols-wrapper">
                                            {colsRight.map((colName, i) => {i += colsLeft.length; return(
                                                <div key={i} className="template-col">
                                                    <div className="col-name">
                                                        <p className="truncate">{colName}</p>
                                                    </div>
                                                    <TextBox
                                                        onChange={(e) => updateColumnDefault(i, e)}
                                                        value={colDefaults[i]}
                                                        type={types[i] === "number" ? "number" : "text"}
                                                        placeholder={`Default ${types[i]}`} 
                                                        className="w-full"
                                                    />
                                                </div>
                                            )})}
                                        </div>
                                    </div>
                                    {/* {columns.map((colName, i) => {return(
                                        <div key={i} className="template-col">
                                            <div className="col-name">
                                                <p className="truncate">{colName}</p>
                                            </div>
                                            <TextBox
                                                onChange={(e) => updateColumnDefault(i, e)}
                                                value={colDefaults[i]}
                                                type="text"
                                                placeholder={`Default value ${i+1}`} 
                                                className="w-full"
                                            />
                                        </div>
                                    )})} */}
                                    <div className="flex-shrink-0 h-4 w-px"/>
                                </div>
                                <p className="w-full mt-2 text-center subtitle italic">Default values are optional and can be overwritten later.</p>
                            </div>
                        }
                    </div>
                </div>
                <div className="backdrop-footer">
                    <div className="flex-grow"/>
                    <Button onClick={submitNewLog} icon={FaCheck} className="special">Create New Log</Button>
                </div>
            </div>
        </div>
    )

}

export default NewLog;