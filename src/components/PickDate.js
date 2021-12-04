import React, { useState } from "react";

// Import icons
import { RiArrowDropDownLine } from "react-icons/ri";

// Import components
import Button from "./Button";

const PickDate = (props) => {
  const months = [
    { data: "January", value: "1" },
    { data: "February", value: "2" },
    { data: "March", value: "3" },
    { data: "April", value: "4" },
    { data: "May", value: "5" },
    { data: "June", value: "6" },
    { data: "July", value: "7" },
    { data: "August", value: "8" },
    { data: "September", value: "9" },
    { data: "October", value: "10" },
    { data: "November", value: "11" },
    { data: "December", value: "12" },
  ];
  const [monthButton, setMonthButton] = useState("Choose Month");
  const [showMonths, setShowMonths] = useState(false);
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [year, setYear] = useState("");
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
          <label className="block uppercase text-blueGray-600 text-xs font-bold mb-1 mt-4">
            Select Date
          </label>
        </div>
      </div>
      <div className="w-full lg:w-4/12 px-4">
        <div className="relative w-full mb-3">
          <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
            Month
          </label>
          <button
            onClick={handleOnclickMonth}
            className="text-white bg-theme hover:bg-carolina focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="button"
          >
            {monthButton}
            <RiArrowDropDownLine className="w-8 h-8 ml-2" />
          </button>
          {showMonths && (
            <div
              className=""
              className="bg-white text-base z-10 list-none divide-y divide-gray-100 rounded shadow w-44 dark:bg-gray-700 mt-1"
            >
              <ul className="py-1 max-h-52 overflow-scroll">
                {months.map((item, index) => (
                  <li
                    key={index}
                    className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white cursor-pointer"
                    onClick={() => {
                      setMonth(item.value);
                      setMonthButton(item.data);
                      setShowMonths(false);
                    }}
                  >
                    {item.data}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className="lg:w-4/12 px-4">
        <div className="relative mb-3">
          <label className="block uppercase text-xs font-bold mb-2">Day</label>
          <input
            onClick={() => setShowMonths(false)}
            onChange={(e) => setDay(e.target.value)}
            type="text"
            className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
          />
        </div>
      </div>
      <div className="w-full lg:w-4/12 px-4">
        <div className="relative w-full mb-3">
          <label className="block uppercase text-xs font-bold mb-2">Year</label>
          <input
            onClick={() => setShowMonths(false)}
            onChange={(e) => setYear(e.target.value)}
            type="text"
            className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
          />
        </div>
        <button
          onClick={() => {
            props.onSelectingDate({ month, year, day });
          }}
          id="dropdownButton"
          className="text-white bg-theme hover:bg-carolina focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 float-right"
          type="button"
        >
          Generate Report
        </button>
      </div>
    </div>
  );
};

export default PickDate;
