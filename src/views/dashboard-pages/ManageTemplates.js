// Import CSS
import "./css/ManageTemplates.css";
// Import major dependencies
import React, { useContext, useState, useEffect } from "react";
// Import components
import Page from "../../components/Page";
import ButtonGroup from "../../components/ButtonGroup";
import Button from "../../components/Button";
import FileBrowser from "../../components/FileBrowser";
import FileIcon from "../../components/FileIcon";
import Header from "../../components/Header";
import ColumnsVisualizer from "../../components/ColumnsVisualizer";
// import Auth from "../../components/Auth";
// import TextBox from "../../components/TextBox";
import NewTemplate from "../../components/NewTemplate";
import Dashboard from "../../views/Dashboard";
// Import icons
// import { FaRegClock } from "react-icons/fa";
import { CgMenuGridR } from "react-icons/cg";
import { HiPlus } from "react-icons/hi";
import { FaRegHandPointer, FaInfoCircle} from "react-icons/fa";
import { BsFillArrowUpCircleFill } from "react-icons/bs";
// Import API and static content
// import api from "../../static/api";
// import storage from "../../static/storage";
import parsePath from "../../static/parsePath";

const templatePages = [
    // {name: "recent"},
    {name: "all"},
    {name: "new"},
]

const setUpDefaultState = (DashboardContext) => {
    const defaultState = {
        i: 0,
        name: templatePages[0].name
    }
    const pathSplit = parsePath.toArray(DashboardContext.state.path);
    if (pathSplit.length > 2) {
        for (let i = 0; i < templatePages.length; i++) {
            if (pathSplit[2] === templatePages[i].name) {
                defaultState.i = i;
                defaultState.name = templatePages[i].name
                break;
            }
        }
    }
    return defaultState;
}

const ManageTemplates = (props) => {

    // const AuthContext = useContext(Auth.Context);
    const DashboardContext = useContext(Dashboard.Context);

    const [selectedTemplate, setSelectedTemplate] = useState(undefined);

    // const [files, setFiles] = useState([]);
    const [pageState, setPageState] = useState(setUpDefaultState(DashboardContext));

    const changeTemplatePage = (i) => {
        const pathSplit = parsePath.toArray(DashboardContext.state.path);
        const newPathSplit = pathSplit.slice(0, 2); newPathSplit.push(templatePages[i].name);
        const newPath = parsePath.toString(newPathSplit);
        const newPageState = {
            i: i,
            name: templatePages[i].name
        }
        setPageState(newPageState);
        DashboardContext.setState((state) => {
            const newState = { ...state };
            newState.path = newPath;
            return newState;
        })
    }

    useEffect(() => {
        setSelectedTemplate(undefined);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageState]);
    
    let pageContent;
    switch (pageState.name) {
        case "recent":
            pageContent = 
                <>
                    <p className="h-8 flex items-center text-lg font-bold">Your Most Recent Templates</p>
                    <div className="h-4"/>
                    <FileBrowser from="recent" type="template"/>
                </>
            break;
        case "all":
            pageContent = 
                <div className="space-y-4">
                    <p className="h-8 flex items-center text-lg font-bold">Browse All Templates</p>
                    <FileBrowser 
                        onSelect={(file) => {setSelectedTemplate(file)}}
                        from="all" 
                        type="template"
                    />
                    <div className="backdrop">
                        <div className="backdrop-header p-2 pb-0">
                            {!selectedTemplate ?
                                <span>
                                    <FaRegHandPointer/><p className="h-8 flex items-center">Select a template to see more</p>
                                </span>
                            :
                                <span>
                                    <FaInfoCircle/><p className="h-8 flex items-center">About this template</p>
                                </span>
                            }
                        </div>
                        <div className="-mx-2 mt-2 pointer-events-none list mini">
                            {selectedTemplate ? 
                                <div className="overflow-hidden">
                                    <FileIcon file={selectedTemplate} type="template"/>
                                </div>
                            :
                                <div className="log-blank-message">
                                    <div className="log-blank-icon"/>
                                    <p className="subtitle italic">No template selected.</p>
                                </div>
                            }
                        </div>
                        {selectedTemplate &&
                            <>
                                <div className="h-4"/>
                                <ColumnsVisualizer template={selectedTemplate}/>
                            </>
                        }
                    </div>
                </div>
            break;
        case "new":
            pageContent = 
                <>
                    <p className="h-8 flex items-center text-lg font-bold">Create a New Template</p>
                    <div className="h-4"/>
                    {/* <TextBox type="text" placeholder="New Template Name"/> */}
                    <NewTemplate changeTemplatePage={changeTemplatePage} type="template"/>
                </>
            break;
        default:
            pageContent = <></>
            break;
    }

    return (
        <>
            <Header>
                <div className="flex h-8 items-center space-x-4">
                    <p className="text-lg font-bold whitespace-nowrap">
                        Manage Templates
                    </p>
                    <ButtonGroup active={pageState.i} buttons={[
                        // <Button onClick={() => {changeTemplatePage(0)}} icon={FaRegClock}>Recent Templates</Button>,
                        <Button onClick={() => {changeTemplatePage(0)}} icon={CgMenuGridR}>All Templates</Button>,
                        <Button onClick={() => {changeTemplatePage(1)}} icon={HiPlus}>New Template</Button>
                    ]}/>
                </div>
                
            </Header>
            <Page className="with-header">
                {pageContent}
            </Page>
        </>
    )

}

export default ManageTemplates;