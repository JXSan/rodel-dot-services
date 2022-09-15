import React, { useEffect, useState } from "react";
import { auth } from "../config/firebase";
import { getAllUsers } from "../api/users";
import AddUser from "../components/Users/AddUser";
import EditUser from "../components/Users/EditUser";
import UserRow from "../components/Users/UserRow";
import { useUser } from "@clerk/clerk-react";

const Users = () => {
  const [allUsers, setAllUsers] = useState([]);
  const { user } = useUser();
  const fetchAllUsers = async () => {
    const users = await getAllUsers();
    setAllUsers(users.results);
  };

  console.log(user);

  useEffect(() => {
    // fetchAllUsers();
  }, []);

  if (!user.unsafeMetadata.isAdmin) {
    return <h1>User Not Authorized</h1>;
  } else
    return (
      <div className="h-auto w-full px-10 flex flex-col space-y-4">
        <h1>User Management</h1>
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <th>Display Name</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Roles</th>
                <th>Status</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {/* {allUsers &&
              allUsers.map((user) => {
                return <UserRow key={user.id} rowData={user} />;
              })} */}
            </tbody>
          </table>
        </div>
        <AddUser />
      </div>
    );
};

export default Users;
