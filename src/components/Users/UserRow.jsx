import React from "react";

const UserRow = ({ rowData }) => {
  const openEditModal = async (event) => {};

  return (
    <tr key={rowData._id} className="">
      <th>
        <label>
          <input type="checkbox" className="checkbox" />
        </label>
      </th>
      <td>
        <div className="flex items-center space-x-3">
          <div>
            <div className="font-bold">{rowData.displayName}</div>
          </div>
        </div>
      </td>
      <td>{rowData.firstName}</td>
      <td>{rowData.lastName}</td>
      <td>{rowData.email}</td>
      <td>{rowData.phone}</td>
      <td>
        <div className="flex flex-col space-y-2">
          {rowData.isAdmin ? (
            <span className="badge badge-primary badge-sm">Administrator</span>
          ) : (
            ""
          )}
          <span className="badge badge-accent badge-sm">Employee</span>
        </div>
      </td>
      <td>{rowData.status ? "Active" : "Inactive"}</td>
      <td>
        {/* <EditUser /> */}
        <button onClick={openEditModal} className="btn btn-sm hover:glass">
          Edit
        </button>
      </td>
    </tr>
  );
};

export default UserRow;
