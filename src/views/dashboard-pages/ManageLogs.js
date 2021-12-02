// Import CSS
import "./css/ManageLogs.css";
// Import major dependencies
import React, { useState, useContext } from "react";
// Import components
import Page from "../../components/Page";
import ButtonGroup from "../../components/ButtonGroup";
import Button from "../../components/Button";
import Dashboard from "../../views/Dashboard";
import FileBrowser from "../../components/FileBrowser";
import Header from "../../components/Header";
// Import icons
import { FaRegHandPointer, FaPen, FaCheck } from "react-icons/fa";
import { CgMenuGridR } from "react-icons/cg";
import { HiPlus } from "react-icons/hi";
// Import API and static content
import parsePath from "../../static/parsePath";
import NewLog from "../../components/NewLog";
import FileIcon from "../../components/FileIcon";

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

    // const [files, setFiles] = useState([]);
    const [pageState, setPageState] = useState(setUpDefaultState(DashboardContext));
    const [selectedLog, setSelectedLog] = useState(undefined);
    const [editing, setEditing] = useState(false);

    const changeTemplatePage = (i) => {
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

    const onTemplateClick = (log) => {
        // console.log(log);
        setSelectedLog(log);
    }

    // const [pageState, setPageState] = useState(0);

    let pageContent;
    switch (pageState.i) {
        case 0:
            pageContent = 
                <>
                    <p className="h-8 flex items-center text-lg font-bold">
                        {editing ? 
                            "Editing Log"
                            :
                            "Browse All Logs"
                        }
                    </p>
                    {!editing && 
                        <>
                            <div className="h-4"/>
                            <FileBrowser 
                                onSelect={onTemplateClick}
                                from="all" 
                                type="log"
                            />
                        </>
                    }
                    <div className="h-4"/>
                    <div className="backdrop log-edit-prompt list">
                        <div className="backdrop-header p-2 pb-0 flex items-center space-x-2">
                            {!selectedLog ?
                                <>
                                    <FaRegHandPointer/><p className="h-8 flex items-center">Select a log to begin editing</p>
                                </>
                            :
                                !editing ?
                                    <Button
                                        onClick={() => {setEditing(true)}}
                                        icon={FaPen} 
                                        className="special"
                                    >
                                        Add Slides to This Log
                                    </Button>
                                :
                                    <Button
                                        icon={FaCheck}
                                        className="special"
                                        onClick={() => {setEditing(false)}}
                                    >
                                        Save and Exit
                                    </Button>
                                
                            }
                        </div>
                        <div className="-mx-2 -mb-2 mt-2 pointer-events-none">
                            {selectedLog ? 
                                <FileIcon file={selectedLog} type="log"/>
                            :
                                <div className="log-blank-message">
                                    <div className="log-blank-icon"/>
                                    <p className="subtitle italic">No log selected.</p>
                                </div>
                            }
                        </div>
                    </div>
                    {editing &&
                        <div className="backdrop log-editor mt-4">
                            <div className="table-wrapper">
                                <div className="left">
                                    <div className="side-header">To be completed by</div>
                                    <div className="side-scroll">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <td>hello</td>
                                                    <td>world</td>
                                                    <td>world</td>
                                                    <td>world</td>
                                                    <td>hello</td>
                                                    <td>world</td>
                                                    <td>world</td>
                                                    <td>world</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
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
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    
                                </div>
                                <div className="right">
                                    <div className="side-header">To be completed by</div>
                                    <div className="side-scroll">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <td>hello</td>
                                                    <td>world</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>hello</td>
                                                    <td>world</td>
                                                </tr>
                                                <tr>
                                                    <td>hello</td>
                                                    <td>world</td>
                                                </tr>
                                                <tr>
                                                    <td>hello</td>
                                                    <td>world</td>
                                                </tr>
                                                <tr>
                                                    <td>hello</td>
                                                    <td>world</td>
                                                </tr>
                                            </tbody>
                                        </table>
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
                    <p className="text-lg font-bold">Create a New Log</p>
                    <div className="h-4"/>
                    <NewLog changeTemplatePage={changeTemplatePage}/>
                </>
            break;
        default:
            pageContent = <></>
            break;
    }

    return (
        <>
            <Header>
                <ButtonGroup active={pageState.i} buttons={[
                    // <Button onClick={() => {changeTemplatePage(0)}} icon={FaRegClock}>Recent Logs</Button>,
                    <Button onClick={() => {changeTemplatePage(0)}} icon={CgMenuGridR}>All Logs</Button>,
                    <Button onClick={() => {changeTemplatePage(1)}} icon={HiPlus}>New Log</Button>
                ]}/>
            </Header>
            <Page className="with-header">
                {pageContent}
            </Page>
        </>
    )

}

export default ManageLogs;