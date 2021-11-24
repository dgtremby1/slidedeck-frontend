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
import { FaRegClock } from "react-icons/fa";
import { CgMenuGridR } from "react-icons/cg";
import { HiPlus } from "react-icons/hi";
// Import API and static content
import parsePath from "../../static/parsePath";

const logPages = [
    {name: "recent"},
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

    // const [pageState, setPageState] = useState(0);

    let pageContent;
    switch (pageState.i) {
        case 0:
            pageContent = 
                <>
                    <p className="text-lg font-bold">Your Most Recent Logs</p>
                    <div className="h-4"/>
                    {/* <FileBrowser files={testFiles}/> */}
                </>
            break;
        case 1:
            pageContent = 
                <>
                    <p className="text-lg font-bold">Browse All Logs</p>
                    <div className="h-4"/>
                    <FileBrowser from="all" type="log"/>
                </>
            break;
        case 2:
            pageContent = 
                <>
                    <p className="text-lg font-bold">Create a New Log</p>
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
                    <Button onClick={() => {changeTemplatePage(0)}} icon={FaRegClock}>Recent Logs</Button>,
                    <Button onClick={() => {changeTemplatePage(1)}} icon={CgMenuGridR}>All Logs</Button>,
                    <Button onClick={() => {changeTemplatePage(2)}} icon={HiPlus}>New Log</Button>
                ]}/>
            </Header>
            <Page className="with-header">
                {pageContent}
            </Page>
        </>
    )

}

export default ManageLogs;