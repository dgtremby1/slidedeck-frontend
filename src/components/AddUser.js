// Import major dependencies
import React from "react";

// Import Components
import TextBox from "./TextBox";
import Button from "./Button";

// Import icons
import { FaUserPlus } from "react-icons/fa";

const AddUser = (props) => {
  return (
    <div>
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
            <TextBox placeholder="Email" />
          </div>
        </div>
        <Button className="mt-5 ml-4">Generate</Button>
      </div>
    </div>
  );
};

export default AddUser;
