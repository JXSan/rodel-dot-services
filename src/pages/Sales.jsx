import React, { useEffect, useState } from "react";
import { Menu } from "@headlessui/react";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { getAllStripeTransactions } from "../api/stripeTransactions";

const styles = {
  activeButton:
    "flex mx-6 hover:bg-gradient-to-tr hover:from-red-500 hover:to-red-900 hover:text-white shadow-md items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg bg-gradient-to-tr from-red-500 to-red-900 text-white shadow-md",
  regularButton:
    "flex mx-6 hover:bg-gradient-to-tr hover:from-red-500 hover:to-red-900 hover:text-white shadow-md items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg",
};

const columns = [
  { field: "service_type", headerName: "SERVICE TYPE", flex: 1 },
  { field: "amount_charged", headerName: "AMOUNT CHARGED", flex: 1 },
  { field: "created_on", headerName: "CREATED ON", flex: 1 },
  { field: "customer_name", headerName: "CUSTOMER NAME", flex: 1 },
  { field: "customer_email", headerName: "CUSTOMER EMAIL", flex: 1 },
  { field: "customer_address", headerName: "CUSTOMER ADDRESS", flex: 1 },
  { field: "customer_phone", headerName: "CUSTOMER PHONE", flex: 1 },
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

export const Sales = () => {
  const [allTransations, setAllTransactions] = useState([]);
  const [rows, setRows] = useState([]);

  const fetchAllTransactions = async () => {
    const response = await getAllStripeTransactions();
    if (response) {
      setAllTransactions(response?.results);
      console.log(response?.results);
      const allRows = response?.results?.map((transaction) => {
        const date = new Date(transaction?.created).toLocaleDateString("en-US");
        const time = new Date(transaction?.created).toLocaleTimeString("en-US");
        return {
          id: transaction.id,
          service_type: "TEST",
          amount_charged: transaction?.amount_received,
          created_on: transaction?.created ? `${date} ${time}` : "N/A",
          customer_name: transaction?.charges?.data[0]?.billing_details?.name,
          customer_email: transaction?.charges?.data[0]?.billing_details?.email,
          customer_address:
            transaction?.charges?.data[0]?.billing_details?.address?.city,
          customer_phone: transaction?.charges?.data[0]?.billing_details?.phone
            ? transaction?.charges?.data[0]?.billing_details?.phone
            : "N/A",
          status: "",
        };
      });

      setRows(allRows);
    }
  };

  useEffect(() => {
    fetchAllTransactions();
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center">
      {/* Sales Form */}
      <div className="w-full mx-10 px-4 py-2 border border-gray-500 shadow-md rounded-lg flex flex-col">
        {/* New Sale Button - Position in the top right corner of the container. This button will be a dropdown menu of different services to purchase.*/}
        <div className="w-auto flex justify-end mb-2">
          <a
            href="https://buy.stripe.com/test_8wMcNVgsucw6aL6eUU"
            target="_blank"
            className={`px-2 py-1 btn ${styles.activeButton}`}
          >
            New Sale
          </a>
        </div>
        <div className="w-full h-96">
          <DataGrid className="" rows={rows} columns={columns} pageSize={15} />
        </div>
      </div>
    </div>
  );
};
