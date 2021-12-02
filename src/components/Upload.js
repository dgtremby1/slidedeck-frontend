// Import major dependencies
import React from "react";

// Import components
import Button from "./Button";

// Import icons
import { FaFileSignature } from "react-icons/fa";

const Upload = (props) => {
  return (
    <div className="flex justify-center mt-8">
      <div className="max-w-2xl rounded-lg shadow-xl bg-gray-50">
        <div className="m-4">
          <div className="flex items-center">
            <label className="inline-block mb-2 text-gray-500">
              {props.title}
            </label>
            <a
              target="_blank"
              href="https://www.signwell.com/online-signature/"
            >
              <div className="ml-20 mb-2 bg-theme p-1 rounded flex px-2">
                <FaFileSignature className="text-white mt-1 mr-1" />
                <p className="text-white">Create Signature</p>
              </div>
            </a>
          </div>

          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col w-full h-32 border-4 border-blue-200 border-dashed hover:bg-gray-100 hover:border-gray-300">
              <div className="flex flex-col items-center justify-center pt-7">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8 text-gray-400 group-hover:text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                ></svg>
                <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                  {props.subtitle}
                </p>
              </div>
              <input type="file" className="opacity-0" />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
