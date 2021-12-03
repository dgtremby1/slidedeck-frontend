import "./css/ActiveUser.css";

// Import major dependencies
import React, { useState } from "react";

// Import components
import DeleteModal from "./DeleteModal";

// Import icons
import { FaUserMd } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";

const ActiveUsers = (props) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>

      <div className="mb-4 flex items-center justify-between">
        <p>This is a list of all active users and their information.</p>
        {/* <div>
          <h3 className="text-xl font-bold mb-2">Active users</h3>
          <span className="text-base font-normal ">
            This is a list of all active users and their information.
          </span>
        </div> */}
      </div>

      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="align-middle inline-block min-w-full">
            <div className="shadow overflow-hidden">
              <table className="min-w-full rounded overflow-hidden">
                <thead className="bg-theme h-10">
                  <tr>
                    <th
                      scope="col"
                      className="px-4 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      User Full Name
                    </th>
                    <th
                      scope="col"
                      className="px-4 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      Username
                    </th>
                    <th
                      scope="col"
                      className="px-4 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-4 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      Role
                    </th>
                    <th
                      scope="col"
                      className="px-4 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      Delete User
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="active-user-row">
                    <td className="p-4 whitespace-nowrap text-sm font-normal flex">
                      <FaUserMd className="mr-2 rounded-full h-5 w-5 items-center justify-center" />
                      <span className="font-semibold">Bonnie Green</span>
                    </td>
                    <td className="p-4 whitespace-nowrap text-sm font-normal">
                      bgreen
                    </td>
                    <td className="p-4 whitespace-nowrap text-sm font-semibold">
                      bgreen@unchealth.unc.edu
                    </td>
                    <td className="p-4 whitespace-nowrap text-sm font-semibold">
                      Technician
                    </td>
                    <td className="p-4 whitespace-nowrap text-sm font-semibold">
                      <RiDeleteBin5Fill
                        className="ml-8 rounded-full h-5 w-5 items-center justify-center text-red-500 cursor-pointer"
                        onClick={() => setShowModal(true)}
                      />
                    </td>
                  </tr>
                  <tr className="active-user-row">
                    <td className="p-4 whitespace-nowrap text-sm font-normal flex">
                      <FaUserMd className="mr-2 rounded-full h-5 w-5 items-center justify-center" />
                      <span className="font-semibold">Master Chief</span>
                    </td>
                    <td className="p-4 whitespace-nowrap text-sm font-normal">
                      john117
                    </td>
                    <td className="p-4 whitespace-nowrap text-sm font-semibold">
                      john117@fleetcom.unsc.un
                    </td>
                    <td className="p-4 whitespace-nowrap text-sm font-semibold">
                      Master Chief
                    </td>
                    <td className="p-4 whitespace-nowrap text-sm font-semibold">
                      <RiDeleteBin5Fill
                        className="ml-8 rounded-full h-5 w-5 items-center justify-center text-red-500 cursor-pointer"
                        onClick={() => setShowModal(true)}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {showModal && <DeleteModal onCancel={() => setShowModal(false)} />}
    </div>
  );
};

export default ActiveUsers;
