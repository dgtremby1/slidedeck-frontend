// Import major dependencies
import React from "react";

// Import icons
import { TiUserDelete } from "react-icons/ti";
import { FaTrashAlt } from "react-icons/fa";
import Button from "./Button";

const DeleteModal = (props) => {
  return (
    <div className="bg-opacity-0">
      <div
        className="min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover"
        id="modal-id"
      >
        <div className="absolute bg-black opacity-50 inset-0 z-0"></div>
        <div className="w-full  max-w-lg p-5 relative mx-auto my-auto rounded shadow-lg  backdrop-bg">
          <div className="">
            <div className="text-center p-5 flex-auto justify-center content-center">
              <div className="text-center justify-center flex">
                <TiUserDelete className="rounded-full h-20 w-20 items-center justify-center text-red-500" />
              </div>
              <h2 className="text-xl font-bold py-4 ">Are you sure?</h2>
              <p className="px-8">
                Do you really want to delete this account? This process cannot
                be undone
              </p>
            </div>
            <div className="p-3 flex justify-center items-center mt-2 text-center space-x-4">
              {/* <button
                className="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100"
                onClick={props.onCancel}
              >
                Cancel
              </button>
              <button className="mb-2 md:mb-0 bg-red-500 border border-red-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-red-600">
                Delete
              </button> */}
              <Button onClick={props.onCancel}>Cancel</Button>
              <Button icon={FaTrashAlt} className="warn">Delete</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
