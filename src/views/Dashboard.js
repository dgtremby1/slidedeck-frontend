// Import CSS
import "./css/Dashboard.css";
// Import major dependencies
import React, { createContext, useEffect, useState } from "react";
import { Helmet } from 'react-helmet-async';
import { useHistory } from "react-router-dom";
// Import components
import Page from "../components/Page";
import Sidebar from "../components/Sidebar";
import SidebarItem from "../components/SidebarItems";
// import HomeCards from "./dashboard-pages/HomeCards";
import DeveloperCards from "./dashboard-pages/DeveloperArea";
// import Auth from "../components/Auth";
import ManageLogs from "./dashboard-pages/ManageLogs";
import ManageTemplates from "./dashboard-pages/ManageTemplates";
// Import icons
// Import API and static content
import dashboardItems from "../static/dashboardItems";
import storage from "../static/storage";
import parsePath from "../static/parsePath";

const setUpDefaultState = (lastState, defaultState) => {
    const path = window.location.pathname;
    const pathSplit = parsePath.toArray(path);
    let active = 0;
    for (let i = 0; i < dashboardItems.length; i++) {
        if (dashboardItems[i].path === "/" + pathSplit[1]) {
            active = i;
            break;
        }
    }
    if (lastState) {
        lastState.path = path;
        lastState.active.i = active;
        lastState.active.title = dashboardItems[active].title;
    }
    defaultState.path = path;
    defaultState.active.i = active;
    defaultState.active.title = dashboardItems[active].title;
}
const DashboardContext = createContext();

const DashboardPage = (props) => {
    
    // const AuthContext = useContext(Auth.Context);
    const defaultState = {
        active: {
            i: 0,
            title: dashboardItems[0].title,
        },
        path: "/dashboard/home",
        sidebarShow: true
    }
    const lastState = storage.get("dashboard");
    setUpDefaultState(lastState, defaultState);
    const [dashboardState, setDashboardState] = useState(lastState ? lastState : defaultState);
    const [dashboardContent, setDashboardContent] = useState(<></>);
    const history = useHistory();
    // Update dashboard content based on unique path
    const updateDashboard = (state) => {
        storage.set("dashboard", state);
        history.push(state.path);
        const pathSplit = parsePath.toArray(state.path);
        switch (pathSplit[1]) {
            case "logs":
                setDashboardContent(<ManageLogs/>);
                break;
            case "templates":
                setDashboardContent(<ManageTemplates/>);
                break;
            case "dev":
                setDashboardContent(<DeveloperCards/>);
                break;
            default:
                setDashboardContent(<Page>{state.active.title}</Page>);
                break;
        }
    }
    // Call appropriate update functions when main state changes
    useEffect(() => {
        updateDashboard(dashboardState);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dashboardState])

    return (
        <DashboardContext.Provider value={{
            state: dashboardState,
            setState: setDashboardState
        }}>
            <Helmet>
                <title>
                    {dashboardState.active.title}
                </title>
            </Helmet>
            <div className={"dashboard" + (dashboardState.sidebarShow ? " show-sidebar" : "")}>
                {/* Sidebar */}
                <Sidebar show={dashboardState.sidebarShow}>
                    <div className="space-y-4">
                        {dashboardItems.map((item, i) => {return(
                            <SidebarItem 
                                active={i === dashboardState.active.i}
                                key={i}
                                index={i}
                                title={item.title}
                                icon={item.icon}
                                path={item.path}
                            ></SidebarItem>
                        )})}
                    </div>
                </Sidebar>
                {/* End sidebar */}
                {/* Main content */}
                <div className="flex-grow">
                    <div className="dashboard-main-content">
                        {dashboardContent}
                    </div>
                </div>
            </div>
        </DashboardContext.Provider>
            
    )
}

const Dashboard = {
    Page: DashboardPage,
    Context: DashboardContext
}

export default Dashboard;