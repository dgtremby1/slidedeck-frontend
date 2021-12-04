// Import major dependencies
import React, { useState, useContext } from "react";

// Import Components
import TextBox from "./TextBox";
import Button from "./Button";
import Auth from "./Auth";
import Banner from "./Banner";

// Import API
import api from "../static/api";

// Import icons
import { FaUserPlus } from "react-icons/fa";

const AddUser = (props) => {
  const AuthContext = useContext(Auth.Context);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [code, setCode] = useState("");
  const [showCode, setShowCode] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showError, setShowError] = useState(false);

  const onGenerate = async () => {
    const validRoles = ["technician", "pathologist"];
    try {
      const credentials = {
        token: AuthContext.user.token,
        role: role,
        email: email,
      };
      if (!validRoles.includes(credentials.role)) {
        setErrorMessage(
          "Invalid Role. Please enter a valid role: pathologist/technician."
        );
        setShowError(true);
      } else {
        console.log(credentials);
        const response = await api.get_signup(credentials);
        //console.log(response);
        setCode(response.data);
        setShowCode(true);
      }
    } catch (error) {}
  };
  return (
    <div>
      <Banner
        dismiss={() => {
          setShowError(false);
        }}
        show={showError}
      >
        {errorMessage}
      </Banner>
      <h2 className="font-bold text-sm mt-4 mb-2">
        Generate one time registration code.
      </h2>
      <div className="flex">
        <div className="flex">
          <div className="bg-transparent flex items-center justify-center">
            <FaUserPlus className="rounded-full w-10 h-10 mr-3" />
          </div>
          <div className="items-center justify-center body-step">
            <p className="text-xs mb-1">Enter user email address.</p>
            <TextBox
              placeholder="Email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="items-center justify-center body-step ml-4">
            <p className="text-xs mb-1">Enter user role.</p>
            <TextBox
              placeholder="Role"
              onChange={(e) => {
                setRole(e.target.value);
              }}
            />
          </div>
        </div>
        <Button className="mt-5 ml-4" onClick={onGenerate}>
          Generate
        </Button>
      </div>
      {showCode && (
        <h2 className="font-bold text-sm mt-4 mb-2 mt-2">
          The code for {email} with role {role} is: {code}
        </h2>
      )}
    </div>
  );
};

export default AddUser;
