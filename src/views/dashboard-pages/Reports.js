// Import CSS
// Import major dependencies
import React from "react";
// Import components
import Page from "../../components/Page";
import Button from "../../components/Button";
import ThemeSwitcher from "../../components/ThemeSwitcher";
// Import icons
import { FaThumbsUp } from "react-icons/fa";
// Import API and static content
import storage from "../../static/storage";
import Header from "../../components/Header";
import FileBrowser from "../../components/FileBrowser";

const Reports = (props) => {

    const clearLocalStorage = () => {
        storage.removeAll();
        window.location.reload();
    }

    const onLogSelect = (logFile) => {
        // TODO
        console.log(logFile);
    }

    return (
        <>
            <Header>
                <p className="h-8 flex items-center font-bold text-lg">Reports</p>
            </Header>
            <Page className="with-header">

                <FileBrowser
                    onSelect={onLogSelect}
                    type="log"
                    from="all"
                />



            </Page>
        </>
    )
}

export default Reports;