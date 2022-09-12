import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createNewUser } from "../../api/users";
import toast from "react-hot-toast";
import { auth } from "../../config/firebase";

const AddUserForm = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    // event.preventDefault();
    // try {
    //   setError("");
    //   // Create firebase authentication
    //   const fireBaseUser = await register(formData.email, formData.password);
    //   if (fireBaseUser) {
    //     const uid = fireBaseUser.user.uid;
    //     formData.uid = uid;
    //     const mongoUser = await createNewUser(formData);
    //     if (fireBaseUser && mongoUser) {
    //       toast.success(`User created`);
    //       setFormData({});
    //       navigate("/users");
    //     }
    //   }
    // } catch (err) {
    //   setError(err.message);
    //   toast.error(`Error: ${err.message}`);
    // }
  };

  const handleChange = (event) => {
    const id = event.target.id;
    if (id === "isAdmin") {
      setFormData({ ...formData, [id]: event.target.checked });
    } else {
      setFormData({ ...formData, [id]: event.target.value });
    }
  };

  return (
    <div>
      <form>
        <div className="flex space-x-4 mt-4">
          <div>
            <label className="font-bold">Display Name</label>
            <input
              id="displayName"
              type="text"
              placeholder="Type here"
              className="input w-full max-w-xs border border-gray-300"
              onChange={handleChange}
              required={true}
              value={formData.displayName}
            />
          </div>
          <div>
            <label className="font-bold">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Type here"
              className="input w-full max-w-xs border border-gray-300"
              onChange={handleChange}
              required={true}
              value={formData.password}
            />
          </div>
        </div>
        <div className="flex space-x-4 mt-4">
          <div>
            <label className="font-bold">First Name</label>
            <input
              id="firstName"
              type="text"
              placeholder="Type here"
              className="input w-full max-w-xs border border-gray-300"
              onChange={handleChange}
              required={true}
              value={formData.firstName}
            />
          </div>
          <div>
            <label className="font-bold">Last Name</label>
            <input
              id="lastName"
              type="text"
              placeholder="Type here"
              className="input w-full max-w-xs border border-gray-300"
              onChange={handleChange}
              required={true}
              value={formData.lastName}
            />
          </div>
        </div>
        <div className="flex space-x-4 mt-4">
          <div>
            <label className="font-bold">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Type here"
              className="input w-full max-w-xs border border-gray-300"
              onChange={handleChange}
              required={true}
              value={formData.email}
            />
          </div>
          <div>
            <label className="font-bold">Phone</label>
            <input
              id="phone"
              type="number"
              placeholder="Type here"
              className="input w-full max-w-xs border border-gray-300"
              onChange={handleChange}
              value={formData.phone}
            />
          </div>
        </div>
        <div className="flex flex-col mt-4">
          <div>
            <label className="font-bold">Roles</label>
          </div>
          <div className="flex">
            <div className="flex p-1 space-x-2">
              <input
                id="isAdmin"
                onChange={handleChange}
                type="checkbox"
                className="checkbox"
                value={formData.isAdmin}
              />

              <label>Administrator</label>
            </div>
          </div>
        </div>
        <label
          htmlFor="my-modal"
          onClick={handleSubmit}
          className="btn hover:bg-gray-500 border-none mt-4"
        >
          Create User
        </label>
      </form>
    </div>
  );
};

export default AddUserForm;

// <label
//   htmlFor="my-modal"
//   className="btn btn-sm btn-circle absolute right-2 top-2"
// >
//   ✕
// </label>;
