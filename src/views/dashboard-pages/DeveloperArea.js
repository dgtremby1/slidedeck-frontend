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

const DeveloperCards = (props) => {

    const clearLocalStorage = () => {
        storage.removeAll();
        window.location.reload();
    }

    return (
        <>
            <Header>
                <p className="font-bold text-lg">Developer Area</p>
            </Header>
            <Page className="with-header">
                <p>Pls be careful if you touch anything here</p>
                <div className="h-4"/>
                <ThemeSwitcher/>
                <div className="h-4"/>
                <p>DANGER</p>
                <div className="h-4"/>
                <Button 
                    onClick={clearLocalStorage}
                    icon={FaThumbsUp}
                >
                    Clear localStorage
                </Button>
            </Page>

            

            {/* <Card></Card>
            <Card></Card>
            <Card></Card>
            <Card></Card> */}
        </>
    )
}

export default DeveloperCards;