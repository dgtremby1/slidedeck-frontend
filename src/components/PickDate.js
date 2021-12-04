import React, { useState } from "react";

// Import icons
import { RiArrowDropDownLine } from "react-icons/ri";

const PickDate = (props) => {
  const [showMonths, setShowMonths] = useState(false);
  const handleOnclickMonth = () => {
    if (showMonths) {
      setShowMonths(false);
    } else {
      setShowMonths(true);
    }
  };
  return (
    <div className="flex flex-wrap">
      <div className="w-full lg:w-12/12 px-4">
        <div className="relative w-full mb-3">
          <label
            className="block uppercase text-blueGray-600 text-xs font-bold mb-1 mt-4"
            htmlfor="grid-password"
          >
            Select Date
          </label>
        </div>
      </div>
      <div className="w-full lg:w-4/12 px-4">
        <div className="relative w-full mb-3">
          <label
            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
            htmlfor="grid-password"
          >
            Month
          </label>
          <button
            onClick={handleOnclickMonth}
            id="dropdownButton"
            data-dropdown-toggle="dropdown"
            className="text-white bg-theme hover:bg-carolina focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="button"
          >
            Choose Month
            <RiArrowDropDownLine className="w-8 h-8 ml-2" />
          </button>
          {showMonths && (
            <div
              id="dropdown"
              className="bg-white text-base z-10 list-none divide-y divide-gray-100 rounded shadow w-44 dark:bg-gray-700 mt-1"
            >
              <ul className="py-1" aria-labelledby="dropdownButton">
                <li className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white cursor-pointer">
                  January
                </li>
                <li className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white cursor-pointer">
                  February
                </li>
                <li className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white cursor-pointer">
                  March
                </li>
                <li className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white cursor-pointer">
                  April
                </li>
                <li className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white cursor-pointer">
                  May
                </li>
                <li className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white cursor-pointer">
                  June
                </li>
                <li className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white cursor-pointer">
                  July
                </li>
                <li className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white cursor-pointer">
                  August
                </li>
                <li className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white cursor-pointer">
                  September
                </li>
                <li className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white cursor-pointer">
                  October
                </li>
                <li className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white cursor-pointer">
                  November
                </li>
                <li className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white cursor-pointer">
                  December
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className="lg:w-4/12 px-4">
        <div className="relative mb-3">
          <label
            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
            htmlfor="grid-password"
          >
            Day
          </label>
          <input
            type="text"
            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
          />
        </div>
      </div>
      <div className="w-full lg:w-4/12 px-4">
        <div className="relative w-full mb-3">
          <label
            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
            htmlfor="grid-password"
          >
            Year
          </label>
          <input
            type="text"
            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
          />
        </div>
      </div>
    </div>
  );
};

export default PickDate;
