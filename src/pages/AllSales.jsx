import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { createCharge } from "../api/stripeTransactions";
import { useUser } from "@clerk/clerk-react";
import { getAllUserSales } from "../api/sales";

const columns = [
  { field: "service_type", headerName: "SERVICE TYPE", flex: 1 },
  { field: "amount_charged", headerName: "AMOUNT CHARGED", flex: 1 },
  { field: "created_on", headerName: "CREATED ON", flex: 1 },
  { field: "customer_name", headerName: "CUSTOMER NAME", flex: 1 },
  { field: "customer_email", headerName: "CUSTOMER EMAIL", flex: 1 },
  { field: "status", headerName: "STATUS", flex: 1 },
  // {
  //   field: "details",
  //   headerName: "DETAILS",
  //   flex: 1,
  //   renderCell: (params) => {
  //     console.log(params);
  //     return (
  //       <Link
  //         className="p-2 rounded-md bg-gray-100 shadow-lg hover:bg-gray-500"
  //         to={`/companydetails/${params.id}`}
  //       >
  //         Details
  //       </Link>
  //     );
  //   },
  // },
];

const AllSales = () => {
  const [rows, setRows] = useState([]);
  const user = useUser();
  const { id } = user.user;
  const fetchAllSales = async () => {
    const response = await getAllUserSales(id);
    if (response) {
      const allRows = response?.results
        .slice(0)
        .reverse()
        .map((transaction) => {
          return {
            id: transaction?._id,
            service_type: transaction?.serviceType,
            amount_charged: transaction.session?.amount_total / 100,
            created_on: transaction?.createdOn,
            customer_name: transaction?.session?.customer_details?.name,
            customer_email: transaction?.session?.customer_details?.email,
            status: transaction?.status,
          };
        });
      setRows(allRows);
    }
  };

  useEffect(() => {
    fetchAllSales();
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center flex-col">
      <div className="stats shadow flex">
        <div className="stat">
          <div className="stat-figure text-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-8 h-8 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>
          <div className="stat-title">Todays Total Sales</div>
          <div className="stat-value">$323.32</div>
          <div className="stat-desc">2 Sales Made | September 15, 2022</div>
        </div>
        <div className="stat">
          <div className="stat-figure text-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-8 h-8 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>
          <div className="stat-title">This Weeks Total Sales</div>
          <div className="stat-value">$323.32</div>
          <div className="stat-desc">2 Sales Made | September 15, 2022</div>
        </div>
        <div className="stat">
          <div className="stat-figure text-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-8 h-8 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>
          <div className="stat-title">This Months Total Sales</div>
          <div className="stat-value">$323.32</div>
          <div className="stat-desc">2 Sales Made | September 15, 2022</div>
        </div>
      </div>
      <div className="w-full  px-4 py-2 rounded-lg flex flex-col">
        <div className="w-full h-96 flex">
          <DataGrid
            className="bg-black/2 rounded-md border border-gray-400 drop-shadow-sm"
            rows={rows}
            columns={columns}
            pageSize={15}
          />
        </div>
      </div>
    </div>
  );
};

export default AllSales;
