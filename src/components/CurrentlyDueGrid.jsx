import React, { useState, useEffect } from "react";
import {
  getCurrentCompanies,
  updateAllCurrentlyDueCompanies,
} from "../api/companySnapshot";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const columns = [
  {
    field: "details",
    headerName: "DETAILS",
    width: 100,
    renderCell: (params) => {
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
  {
    field: "legal_name",
    minWidth: 100,
    maxWidth: 500,
    headerName: "LEGAL NAME",
    flex: 1,
  },
  // {
  //   field: "dba_name",
  //   headerName: "DBA NAME",
  //   minWidth: 300,
  //   flex: 1,
  // },
  // { field: "email", headerName: "EMAIL", minWidth: 300, flex: 1 },
  // { field: "address", minWidth: 300, headerName: "ADDRESS", flex: 1 },
  {
    field: "mcs_150_form_date",
    width: 200,

    headerName: "MCS 150 FORM DATE",
  },
  {
    field: "operating_status",
    width: 200,
    headerName: "OPERATING STATUS",
  },
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

const CurrentlyDueGrid = () => {
  const [allCompanies, setAllCompanies] = useState();
  const [rows, setRows] = useState([]);
  const [searched, setSearched] = useState("");

  const date = new Date();
  const currentMonth = date.getMonth();

  const handleRefreshAllCurrentlyDue = async () => {
    const allUpdatedCompanies = await updateAllCurrentlyDueCompanies();
    if (allUpdatedCompanies) {
      toast.success(
        "All currently due successfully updated. Refreshing page..."
      );
      setTimeout(() => {
        setAllCompanies();
        window.location.reload();
      }, 1000);
    }
  };

  const fetchAllCompanies = async () => {
    const response = await getCurrentCompanies();
    if (response) {
      setAllCompanies(response);
      const allRows = response?.map((company) => {
        return {
          id: company?._id,
          usdot: company?.usdot,
          legal_name: company?.legal_name,
          dba_name: company?.dba_name,
          email: company?.email,
          address: company?.address,
          mcs_150_form_date: new Date(
            company?.mcs_150_form_date
          ).toLocaleDateString(),
          operating_status: company?.operating_status,
        };
      });
      setRows(allRows);
    }
  };

  useEffect(() => {
    fetchAllCompanies();
  }, []);

  return (
    <div style={{ height: 700, width: "80%" }}>
      <div className="p-4 rounded-lg flex items-center justify-between">
        <h1 className="font-extrabold text-transparent md:text-2xl lg:text-4xl bg-clip-text bg-gradient-to-r from-orange-400 to-orange-900">{`Currently Due The Month Of ${months[currentMonth]}`}</h1>
        {/* <button
          onClick={handleRefreshAllCurrentlyDue}
          className="p-1 bg-gray-400 shadow-xl text-white font-light rounded drop-shadow-md hover:bg-orange-500"
        >
          Refresh All Currently Due
        </button> */}
      </div>
      <div className="w-full h-[70vh]">
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={15}
          rowsPerPageOptions={[20]}
          disableSelectionOnClick
        />
      </div>
    </div>
  );
};

export default CurrentlyDueGrid;
