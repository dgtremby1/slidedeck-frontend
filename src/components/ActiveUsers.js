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
    <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Active users</h3>
          <span className="text-base font-normal text-gray-500">
            This is a list of all active users and their information.
          </span>
        </div>
      </div>
      <div className="flex flex-col mt-8">
        <div className="overflow-x-auto rounded-lg">
          <div className="align-middle inline-block min-w-full">
            <div className="shadow overflow-hidden sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-theme">
                  <tr className="">
                    <th
                      scope="col"
                      className="p-4 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      User Full Name
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      Username
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      Role
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      Delete User
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  <tr>
                    <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900 flex">
                      <FaUserMd className="mr-2 rounded-full h-5 w-5 items-center justify-center text-gray-900" />
                      <span className="font-semibold">Bonnie Green</span>
                    </td>
                    <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                      bgreen
                    </td>
                    <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                      bgreen@unchealth.unc.edu
                    </td>
                    <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                      Technician
                    </td>
                    <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                      <RiDeleteBin5Fill
                        className="ml-8 rounded-full h-5 w-5 items-center justify-center text-red-600 cursor-pointer"
                        onClick={() => setShowModal(true)}
                      />
                    </td>
                  </tr>
                  <tr className="bg-blue-50">
                    <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900 rounded-lg rounded-left flex">
                      <FaUserMd className="mr-2 rounded-full h-5 w-5 items-center justify-center text-gray-900" />
                      <span className="font-semibold">John Doe</span>
                    </td>
                    <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                      jdoe
                    </td>
                    <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                      jdoe@unchealth.unc.edu
                    </td>
                    <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                      Technician
                    </td>
                    <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                      <RiDeleteBin5Fill
                        className="ml-8 rounded-full h-5 w-5 items-center justify-center text-red-600 cursor-pointer"
                        onClick={() => setShowModal(true)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900 flex">
                      <FaUserMd className="mr-2 rounded-full h-5 w-5 items-center justify-center text-gray-900" />
                      <span className="font-semibold">Dimitri Trembath</span>
                    </td>
                    <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                      dtrembath
                    </td>
                    <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                      dtrembath@unchealth.unc.edu
                    </td>
                    <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                      Pathologist
                    </td>
                    <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                      <RiDeleteBin5Fill
                        className="ml-8 rounded-full h-5 w-5 items-center justify-center text-red-600 cursor-pointer"
                        onClick={() => setShowModal(true)}
                      />
                    </td>
                  </tr>
                  <tr className="bg-blue-50">
                    <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900 rounded-lg rounded-left flex">
                      <FaUserMd className="mr-2 rounded-full h-5 w-5 items-center justify-center text-gray-900" />
                      <span className="font-semibold">Lana Byrd</span>
                    </td>
                    <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                      lbyrd
                    </td>
                    <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                      lbyrd@unchealth.unc.edu
                    </td>
                    <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                      Technician
                    </td>
                    <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                      <RiDeleteBin5Fill
                        className="ml-8 rounded-full h-5 w-5 items-center justify-center text-red-600 cursor-pointer"
                        onClick={() => setShowModal(true)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900 flex">
                      <FaUserMd className="mr-2 rounded-full h-5 w-5 items-center justify-center text-gray-900" />
                      <span className="font-semibold">Jese Leos</span>
                    </td>
                    <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                      jleos
                    </td>
                    <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                      jleos@unchealth.unc.edu
                    </td>
                    <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                      Technician
                    </td>
                    <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                      <RiDeleteBin5Fill
                        className="ml-8 rounded-full h-5 w-5 items-center justify-center text-red-600 cursor-pointer"
                        onClick={() => setShowModal(true)}
                      />
                    </td>
                  </tr>
                  <tr className="bg-blue-50">
                    <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900 rounded-lg rounded-left flex">
                      <FaUserMd className="mr-2 rounded-full h-5 w-5 items-center justify-center text-gray-900" />
                      <span className="font-semibold">Sheldon Cooper</span>
                    </td>
                    <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                      scooper
                    </td>
                    <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                      scooper@unchealth.unc.edu
                    </td>
                    <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                      Pathologist
                    </td>
                    <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                      <RiDeleteBin5Fill
                        className="ml-8 rounded-full h-5 w-5 items-center justify-center text-red-600 cursor-pointer"
                        onClick={() => setShowModal(true)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900 flex">
                      <FaUserMd className="mr-2 rounded-full h-5 w-5 items-center justify-center text-gray-900" />
                      <span className="font-semibold">Lana Lysle</span>
                    </td>
                    <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                      llysle
                    </td>
                    <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                      llysle@unchealth.unc.edu
                    </td>
                    <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                      Technician
                    </td>
                    <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                      <RiDeleteBin5Fill
                        className="ml-8 rounded-full h-5 w-5 items-center justify-center text-red-600 cursor-pointer"
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
