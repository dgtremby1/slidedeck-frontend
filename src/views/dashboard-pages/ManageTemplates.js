// Import CSS
import "./css/ManageTemplates.css";
// Import major dependencies
import React, { useContext, useState } from "react";
// Import components
import Page from "../../components/Page";
import ButtonGroup from "../../components/ButtonGroup";
import Button from "../../components/Button";
import FileBrowser from "../../components/FileBrowser";
import Header from "../../components/Header";
// import Auth from "../../components/Auth";
// import TextBox from "../../components/TextBox";
import NewTemplate from "../../components/NewTemplate";
import Dashboard from "../../views/Dashboard";
// Import icons
import { FaRegClock } from "react-icons/fa";
import { CgMenuGridR } from "react-icons/cg";
import { HiPlus } from "react-icons/hi";
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
    
    let pageContent;
    switch (pageState.name) {
        case "recent":
            pageContent = 
                <>
                    <p className="text-lg font-bold">Your Most Recent Templates</p>
                    <div className="h-4"/>
                    <FileBrowser from="recent" type="template"/>
                </>
            break;
        case "all":
            pageContent = 
                <>
                    <p className="text-lg font-bold">Browse All Templates</p>
                    <div className="h-4"/>
                    <FileBrowser from="all" type="template"/>
                </>
            break;
        case "new":
            pageContent = 
                <>
                    <p className="text-lg font-bold">Create a New Template</p>
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
                <ButtonGroup active={pageState.i} buttons={[
                    // <Button onClick={() => {changeTemplatePage(0)}} icon={FaRegClock}>Recent Templates</Button>,
                    <Button onClick={() => {changeTemplatePage(0)}} icon={CgMenuGridR}>All Templates</Button>,
                    <Button onClick={() => {changeTemplatePage(1)}} icon={HiPlus}>New Template</Button>
                ]}/>
            </Header>
            <Page className="with-header">
                {pageContent}
            </Page>
        </>
    )

}

export default ManageTemplates;