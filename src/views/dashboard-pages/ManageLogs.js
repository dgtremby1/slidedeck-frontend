// Import CSS
import "./css/ManageLogs.css";
// Import major dependencies
import React, { useState, useContext, useEffect } from "react";
// Import components
import Page from "../../components/Page";
import ButtonGroup from "../../components/ButtonGroup";
import Button from "../../components/Button";
import Dashboard from "../../views/Dashboard";
import FileBrowser from "../../components/FileBrowser";
import Header from "../../components/Header";
// Import icons
import { FaList, FaRegHandPointer, FaPen, FaPlus, FaInfoCircle, FaChevronLeft, FaArrowLeft } from "react-icons/fa";
import { CgMenuGridR } from "react-icons/cg";
import { HiPlus } from "react-icons/hi";
import { BsFillArrowUpCircleFill } from "react-icons/bs";
// Import API and static content
import parsePath from "../../static/parsePath";
import NewLog from "../../components/NewLog";
import FileIcon from "../../components/FileIcon";
import api from "../../static/api";
import Auth from "../../components/Auth";
import LoadSpinner from "../../components/LoadSpinner";
import dashboardItems from "../../static/dashboardItems";

const logPages = [
    // {name: "recent"},
    {name: "all"},
    {name: "new"},
]

const setUpDefaultState = (DashboardContext) => {
    const defaultState = {
        i: 0,
        name: logPages[0].name
    }
    const pathSplit = parsePath.toArray(DashboardContext.state.path);
    if (pathSplit.length > 2) {
        for (let i = 0; i < logPages.length; i++) {
            if (pathSplit[2] === logPages[i].name) {
                defaultState.i = i;
                defaultState.name = logPages[i].name
                break;
            }
        }
    }
    return defaultState;
}

const ManageLogs = (props) => {

    // const AuthContext = useContext(Auth.Context);
    const DashboardContext = useContext(Dashboard.Context);
    const AuthContext = useContext(Auth.Context);

    // const [files, setFiles] = useState([]);
    const [pageState, setPageState] = useState(setUpDefaultState(DashboardContext));
    const [selectedLog, setSelectedLog] = useState(undefined);
    const [selectedTemplate, setSelectedTemplate] = useState(undefined);
    const [editing, setEditing] = useState(false);

    const [columns, setColumns] = useState([]);
    const [columnsLeft, setColumnsLeft] = useState([]);
    const [columnsRight, setColumnsRight] = useState([]);
    const [typesLeft, setTypesLeft] = useState([]);
    const [typesRight, setTypesRight] = useState([]);
    const [roles, setRoles] = useState([]);

    const [slides, setSlides] = useState([]);

    const [activeSide, setActiveSide] = useState(0);

    const changeLogPage = (i) => {
        const pathSplit = parsePath.toArray(DashboardContext.state.path);
        const newPathSplit = pathSplit.slice(0, 2); newPathSplit.push(logPages[i].name);
        const newPath = parsePath.toString(newPathSplit);
        const newPageState = {
            i: i,
            name: logPages[i].name
        }
        setPageState(newPageState);
        DashboardContext.setState((state) => {
            const newState = { ...state };
            newState.path = newPath;
            return newState;
        })
    }

    const fetchedSelectedTemplate = (template) => {
        console.log(template);
        setSelectedTemplate(template);
        readTemplateColumns(template);
    }

    const onLogClick = (log) => {
        console.log(log);
        setSelectedLog(log);
        setSelectedTemplate(undefined);
        api.get_template_id(log.template, AuthContext.user.token, fetchedSelectedTemplate);
    }

    const readTemplateColumns = (template) => {
        let roleLeft = template.headers[0][1][1];
        let roleRight = undefined;
        let columns = [];
        let columnsLeft = [];
        let columnsRight = [];
        let typesLeft = [];
        let typesRight = [];
        // Loop through each header in template
        template.headers.map((header, i) => {
            const name = header[0];
            const type = header[1][0];
            const role = header[1][1];
            // console.log(name, type, role);
            columns.push(name);
            if (role === roleLeft) {
                columnsLeft.push(name);
                typesLeft.push(type);
            } else {
                columnsRight.push(name);
                typesRight.push(type);
                if (!roleRight) roleRight = role;
            }
        });
        setColumns(columns);
        setColumnsLeft(columnsLeft);
        setColumnsRight(columnsRight);
        setTypesLeft(typesLeft);
        setTypesRight(typesRight);
        setRoles([roleLeft, roleRight]);
        // console.log([roleLeft, roleRight]);
    }

    const gotNewSlide = (data) => {
        console.log(data);
    }

    const createNewSlide = () => {
        const token = AuthContext.user.token;
        const logId = selectedLog.id;
        const slide = {
            submit: false,
            fields: {},
            token: token
        };
        for (let i = 0; i < columns.length; i++) {
            slide.fields[columns[i]] = "";
        }
        api.post_log_id_slide(logId, slide, gotNewSlide);
        console.log(slide);
    }

    const SideTable = (props) => {
        const role = props.role;
        const columns = props.columns;
        const types = props.types;
        const side = props.side;
        return(
            <>
                <div className="side-header">
                    To be completed by {role}
                </div>
                <div className="side-scroll">
                    <table>
                        <thead>
                            <tr>
                                {columns.map((column, i) => {return(
                                    <td key={i}>{column}</td>
                                )})}
                            </tr>
                        </thead>
                        <tbody>
                            {slides.map((slide, i) => {return(
                                <tr key={i}><td>{i}</td></tr>
                            )})}
                            {/* <tr>
                                <td>hello</td>
                                <td>world</td>
                                <td>world</td>
                                <td>world</td>
                                <td>hello</td>
                                <td>world</td>
                                <td>world</td>
                                <td>world</td>
                            </tr>
                            <tr>
                                <td>hello</td>
                                <td>world</td>
                                <td>world</td>
                                <td>world</td>
                                <td>hello</td>
                                <td>world</td>
                                <td>world</td>
                                <td>world</td>
                            </tr> */}
                        </tbody>
                    </table>
                    {slides.length === 0 && side === "left" &&
                        <div className="no-row-message">
                            <p className="truncate subtitle italic flex items-center">
                                <FaArrowLeft className="mr-2"/>
                                This log is empty. Create a new slide here.
                            </p>
                        </div>
                    }
                </div>
            </>
        )
    }

    useEffect(() => {
        setSelectedLog(undefined);
        setSelectedTemplate(undefined);
        setEditing(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageState]);

    // const [pageState, setPageState] = useState(0);

    let pageContent;
    switch (pageState.i) {
        case 0:
            pageContent = 
                <>
                    {!editing && 
                        <>
                            <p className="h-8 flex items-center text-lg font-bold">
                                Browse All Logs
                            </p>
                            <div className="h-4"/>
                            <FileBrowser 
                                onSelect={onLogClick}
                                from="all" 
                                type="log"
                            />
                            <div className="h-4"/>
                        </>
                    }
                    <div className="backdrop log-edit-prompt">
                        <div className="backdrop-header p-2 pb-0">
                            {!selectedLog ?
                                <span>
                                    <FaRegHandPointer/><p className="h-8 flex items-center">Select a log to begin editing</p>
                                </span>
                            :
                                <span>
                                    <FaInfoCircle/><p className="h-8 flex items-center">About this log</p>
                                </span>
                            }
                        </div>
                        <div className="-mx-2 mt-2 pointer-events-none list mini">
                            {selectedLog ? 
                                <div className="overflow-hidden">
                                    <FileIcon file={selectedLog} type="log"/>
                                    <div className="flex items-center">
                                        <div className="my-2 mx-3 mr-3.5 h-7 w-7 flex items-center justify-center">
                                            <BsFillArrowUpCircleFill className="h-4 w-4 subtitle"/>
                                        </div>
                                        <p className="subtitle">Log created from following template</p>
                                    </div>
                                    {selectedTemplate ?
                                        <FileIcon file={selectedTemplate} type="template"/>
                                        :
                                        <div className="flex ml-3 w-7 items-center justify-center" style={{height: "60px"}}>
                                            <LoadSpinner/>
                                        </div>
                                    }
                                </div>
                            :
                                <div className="log-blank-message">
                                    <div className="log-blank-icon"/>
                                    <p className="subtitle italic">No log selected.</p>
                                </div>
                            }
                        </div>
                        {!editing ?
                            <>
                                <div className="h-2"/>
                                <div className="backdrop-footer">
                                {!selectedLog ?
                                    <p className="h-8 flex items-center subtitle italic">No log selected.</p>
                                :
                                    selectedTemplate ?
                                        <Button
                                            onClick={() => {setEditing(true)}}
                                            icon={FaPen} 
                                            className="special"
                                        >
                                            Open This Log
                                        </Button>
                                    :
                                        <LoadSpinner/>
                                }
                                </div>   
                            </>
                            :
                            <>
                                <div className="h-2"/>
                                <div className="backdrop-footer">
                                    <p className="h-8 flex items-center subtitle italic">You will only be able to modify your side of the log.</p>
                                </div>
                            </>
                        }
                    </div>
                    {editing &&
                        <div className="backdrop log-editor-wrapper mt-4">
                            <div className="log-editor">
                                <div className="slide-row-control">
                                    <div className="row-top">#</div>
                                    {slides.map((slide, i) => {return(
                                        <div className="row-index" key={i}><p>{i+1}</p></div>
                                    )})}
                                    <Button 
                                        onClick={createNewSlide}
                                        title="add a new slide (row)" 
                                        icon={FaPlus} 
                                        className="row-add"
                                    />
                                </div>
                                <div className="table-wrapper">
                                    <div 
                                        onMouseDown={() => {setActiveSide(0)}}
                                        className={"table-side left " + (activeSide === 0 ? "active-side" : "")}
                                    >
                                        <SideTable 
                                            side="left"
                                            role={roles[0]}
                                            columns={columnsLeft}
                                            types={typesLeft}
                                        />
                                    </div>
                                    <div 
                                        onMouseDown={() => {setActiveSide(1)}}
                                        className={"table-side right " + (activeSide === 1 ? "active-side" : "")}
                                    >
                                        <SideTable 
                                            side="right"
                                            role={roles[1]}
                                            columns={columnsRight}
                                            types={typesRight}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </>
            break;
        case 1:
            pageContent = 
                <>
                    <p className="h-8 flex items-center text-lg font-bold">Create a New Log</p>
                    <div className="h-4"/>
                    <NewLog changeTemplatePage={changeLogPage}/>
                </>
            break;
        default:
            pageContent = <></>
            break;
    }

    return (
        <>
            <Header>
                {editing ? 
                    <div className="h-8 flex items-center space-x-4">
                        <Button 
                            icon={FaChevronLeft}
                            className="special"
                            onClick={() => {setEditing(false)}}
                        >
                            Save and Exit
                        </Button>
                        <ButtonGroup active={activeSide} buttons={[
                            <Button className="capitalize" onClick={() => {setActiveSide(0)}}>{roles[0]}</Button>,
                            <Button className="capitalize" onClick={() => {setActiveSide(1)}}>{roles[1]}</Button>
                        ]}/>
                        <div className="h-8 flex items-center text-lg font-bold">
                            Editing
                            <div className="flex items-center space-x-1 ml-2 truncate">
                                <div className="file-icon-badge">L</div>
                                <span className="truncate">{selectedLog.name}</span>
                            </div>
                        </div>
                    </div>
                    :
                    <div className="flex h-8 items-center space-x-4">
                        <p className="text-lg font-bold">
                            Manage Logs
                        </p>
                        <ButtonGroup active={pageState.i} buttons={[
                            // <Button onClick={() => {changeTemplatePage(0)}} icon={FaRegClock}>Recent Logs</Button>,
                            <Button onClick={() => {changeLogPage(0)}} icon={CgMenuGridR}>All Logs</Button>,
                            <Button onClick={() => {changeLogPage(1)}} icon={HiPlus}>New Log</Button>
                        ]}/>
                    </div>
                    
                }
                
            </Header>
            <Page className="manage-logs with-header">
                {pageContent}
            </Page>
        </>
    )

}

export default ManageLogs;