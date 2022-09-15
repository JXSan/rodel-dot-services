import React, { useState, useEffect } from "react";
import { getUCRDue } from "../api/companySnapshot";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";

const columns = [
  // { field: "id", sortable: true, headerName: "ID", flex: 1 },
  {
    field: "details",
    headerName: "DETAILS",
    flex: 1,
    renderCell: (params) => {
      console.log(params);
      return (
        <Link
          className="p-2 rounded-md bg-gray-100 shadow-lg hover:bg-gray-500"
          to={`/companydetails/${params.id}`}
        >
          Details
        </Link>
      );
    },
  },
  { field: "usdot", sortable: true, headerName: "USDOT" },
  { field: "legal_name", headerName: "LEGAL NAME", flex: 1 },
  { field: "dba_name", headerName: "DBA NAME", flex: 1 },
  { field: "email", headerName: "EMAIL", flex: 1 },
  { field: "address", headerName: "ADDRESS", flex: 1 },
  { field: "mcs_150_form_date", headerName: "MCS 150 FORM DATE", flex: 1 },
  { field: "operating_status", headerName: "OPERATING STATUS", flex: 1 },
];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const UCRDueGrid = () => {
  const [allCompanies, setAllCompanies] = useState();
  const [rows, setRows] = useState([]);
  const [searched, setSearched] = useState("");

  const date = new Date();
  const currentMonth = date.getMonth();

  const fetchAllUCRDueCompanies = async () => {
    const response = await getUCRDue();
    console.log(response);
    // if (response) {
    //   console.log(response);
    //   setAllCompanies(response);
    //   const allRows = response?.map((company) => {
    //     return {
    //       id: company?._id,
    //       usdot: company?.usdot,
    //       legal_name: company?.legal_name,
    //       dba_name: company?.dba_name,
    //       email: company?.email,
    //       address: company?.address,
    //       mcs_150_form_date: company?.mcs_150_form_date,
    //       operating_status: company?.operating_status,
    //     };
    //   });
    //   setRows(allRows);
    // }
  };

  useEffect(() => {
    fetchAllUCRDueCompanies();
  }, []);

  return (
    <div style={{ height: 700, width: "80%" }}>
      <div className="p-4 rounded-lg flex items-center justify-center">
        <h1 className="text-2xl mb-2">{`Past Due Companies`}</h1>
      </div>
      {/* <input
        className="text-black p-4 bg-red-100 w-full h-10"
        type="text"
        value={searched}
        onChange={(searchVal) => requestSearch(searchVal.target.value)}
        // onCancelSearch={() => cancelSearch()}
      /> */}
      <div className="w-full h-[70vh]">
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={15}
          rowsPerPageOptions={[20]}
        />
      </div>
    </div>
  );
};

export default UCRDueGrid;
