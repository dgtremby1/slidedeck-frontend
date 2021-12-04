// Import CSS
// Import major dependencies
import React, { useState } from "react";
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
import PickDate from "../../components/PickDate";

const Reports = (props) => {
  const [showPickDate, setShowPickDate] = useState(false);
  const clearLocalStorage = () => {
    storage.removeAll();
    window.location.reload();
  };

  const onLogSelect = (logFile) => {
    setShowPickDate(true);
  };

  return (
    <>
      <Header>
        <p className="h-8 flex items-center font-bold text-lg">Reports</p>
      </Header>
      <Page className="with-header">
        <FileBrowser onSelect={onLogSelect} type="log" from="all" />
        {showPickDate && (
          <div className="backdrop mt-5">
            <PickDate />
          </div>
        )}
      </Page>
    </>
  );
};

export default Reports;
