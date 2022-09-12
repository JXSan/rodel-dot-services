import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createUser } from "../../api/users";
// import { UserAuth } from "../../context/AuthContext";
import AddUserForm from "./AddUserForm";

const AddUser = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  return (
    <div>
      <label htmlFor="my-modal" className="btn modal-button hover:glass">
        Add New User
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
            <AddUserForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
