// Import CSS
// Import major dependencies
import React, { useContext, useEffect } from "react";
// Import components
import Page from "../../components/Page";
import Button from "../../components/Button";
import ThemeSwitcher from "../../components/ThemeSwitcher";
import Header from "../../components/Header";
import Auth from "../../components/Auth";
import ActiveUsers from "../../components/ActiveUsers";
// Import icons
import { FaTrashAlt } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
// Import API and static content
import storage from "../../static/storage";
import AddUser from "../../components/AddUser";

const Settings = (props) => {
  const AuthContext = useContext(Auth.Context);

  useEffect(() => {
    console.log(AuthContext.user);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const clearLocalStorage = () => {
    storage.removeAll();
    window.location.reload();
  };

  return (
    <>
      <Header>
        <p className="h-8 flex items-center font-bold text-lg">Settings</p>
      </Header>
      <Page className="with-header space-y-4">
        <div className="backdrop">
          <p>Username: {AuthContext.user.username}</p>
          <p>User role: {AuthContext.user.role}</p>
        </div>

        <div className="backdrop">
          <div className="backdrop-header">
            <p className="h-8 flex items-center font-bold">General Options</p>
          </div>
          <div className="h-4" />

          <p>Change user interface appearance.</p>
          <div className="h-4" />
          <ThemeSwitcher />

          <div className="divider" />

          <p>Quit to log-in screen.</p>
          <div className="h-4" />
          <Button onClick={clearLocalStorage} icon={BiLogOut}>
            Sign Out
          </Button>
        </div>

        <div className="backdrop">
          <div className="backdrop-header">
            <p className="h-8 flex items-center font-bold">Advanced Options</p>
          </div>
          <div className="h-4" />
          <p>Clear cache and quit app.</p>
          <div className="h-4" />
          <Button
            className="warn"
            onClick={clearLocalStorage}
            icon={FaTrashAlt}
          >
            Clear Cache
          </Button>
        </div>

        {AuthContext.user.role === "admin" && (
          <div className="backdrop">
            <div className="backdrop-header flex items-center">
              <p className="h-8 flex-grow flex items-center font-bold">
                Manage Users
              </p>
              <p className="subtitle italic">Admins only</p>
            </div>
            <div className="h-4" />
            <ActiveUsers />
            <AddUser />
          </div>
        )}
      </Page>
    </>
  );
};

export default Settings;
