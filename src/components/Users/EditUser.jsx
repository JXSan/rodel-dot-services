import React from "react";
import EditUserForm from "./EditUserForm";

const EditUser = () => {
  return (
    <div>
      <label htmlFor="my-modal" className="btn modal-button hover:glass">
        Edit
      </label>
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="my-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <div>
            <EditUserForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
