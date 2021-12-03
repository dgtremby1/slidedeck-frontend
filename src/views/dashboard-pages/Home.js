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

const Home = (props) => {

    const clearLocalStorage = () => {
        storage.removeAll();
        window.location.reload();
    }

    return (
        <>
            <Header>
                <p className="font-bold text-lg">Home</p>
            </Header>
            <Page className="with-header">
                <p className="flex items-center">Hello <FaThumbsUp className="ml-2"/></p>
            </Page>
        </>
    )
}

export default Home;