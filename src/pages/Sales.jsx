import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { createCharge } from "../api/stripeTransactions";
import { useUser } from "@clerk/clerk-react";
import { getAllUserSales } from "../api/sales";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const PUBLIC_KEY =
  "pk_test_51LeNhcBoa9DkGR7IafhBYHihQ87SRbsylWCr7GTcG8MWfUDOVRh73FeBsJowSsVc6NgyrXe5HCnrw48SdMcvssm500H3zPrjAx";

const styles = {
  activeButton:
    "flex mx-6 hover:bg-gradient-to-tr hover:from-red-500 hover:to-red-900 hover:text-white shadow-md items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg bg-gradient-to-tr from-red-500 to-red-900 text-white shadow-md",
  regularButton:
    "flex mx-6 hover:bg-gradient-to-tr hover:from-red-500 hover:to-red-900 hover:text-white shadow-md items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg",
};

export const Sales = () => {
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();
  const user = useUser();
  const { id } = user.user;
  const [currentRow, setCurrentRow] = useState([]);
  const MCS150_STRIPE_PRODUCT_ID = "price_1LiqTaBoa9DkGR7IvDno57bI";
  const columns = [
    {
      field: "details",
      headerName: "DETAILS",
      width: 100,
      renderCell: (params) => {
        return (
          <div>
            <label
              htmlFor="my-modal"
              className="p-2 rounded-md bg-gray-100 shadow-lg hover:bg-gray-500 modal-button"
              onClick={() => {
                console.log(params.row);
                setCurrentRow(params.row);
              }}
            >
              Details
            </label>
          </div>
        );
      },
    },
    { field: "service_type", headerName: "SERVICE TYPE", flex: 1 },
    { field: "amount_charged", headerName: "AMOUNT CHARGED", flex: 1 },
    { field: "created_on", headerName: "CREATED ON", flex: 1 },
    { field: "customer_name", headerName: "CUSTOMER NAME", flex: 1 },
    { field: "customer_email", headerName: "CUSTOMER EMAIL", flex: 1 },
    { field: "status", headerName: "STATUS", flex: 1 },
  ];

  const redirectToCheckout = async () => {
    const { paymentURL } = await createCharge(user, MCS150_STRIPE_PRODUCT_ID);
    window.location.href = paymentURL;
  };

  const fetchAllUserSales = async () => {
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
            confirmationNumber: transaction?.confirmationNumber,
            companyId: transaction?.companyId,
          };
        });
      setRows(allRows);
    }
  };

  useEffect(() => {
    fetchAllUserSales();
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center flex-col">
      {/* DETAILS MODAL START */}
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Sale Details</h3>
          <hr />
          <div className="flex items-center justify-start mt-2 space-x-2">
            <label className="font-bold">Service Type:</label>
            <p>{currentRow.service_type}</p>
          </div>
          <div className="flex items-center justify-start mt-2 space-x-2">
            <label className="font-bold">Created On: </label>
            <p>{currentRow.created_on}</p>
          </div>
          <div className="flex items-center justify-start mt-2 space-x-2">
            <label className="font-bold">Customer Name: </label>
            <p>{currentRow.customer_name}</p>
          </div>
          <div className="flex items-center justify-start mt-2 space-x-2">
            <label className="font-bold">Customer Email: </label>
            <p>{currentRow.customer_email}</p>
          </div>
          <div className="flex items-center justify-start mt-2 space-x-2">
            <label className="font-bold">Status: </label>
            <p>{currentRow.status}</p>
          </div>
          <div className="flex items-center justify-start mt-2 space-x-2">
            <label className="font-bold">Confirmation: </label>
            <p>
              {currentRow.confirmationNumber
                ? currentRow.confirmationNumber
                : "This sale is not complete."}
            </p>
          </div>
          <div className="flex items-center justify-start mt-2">
            <button
              className="p-1 bg-violet-200 hover:bg-violet-300 rounded-md shadow-md"
              onClick={() => {
                navigate(`/companydetails/${currentRow.companyId}`);
              }}
            >
              Company Details
            </button>
          </div>
          <div className="modal-action">
            <label htmlFor="my-modal" className="btn bg-red-400 border-none">
              CLOSE
            </label>
          </div>
        </div>
      </div>
      {/* DETAILS MODAL END */}
      <div className="stats shadow">
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
      <div className="w-[100wh] flex ml-10 space-x-4 bg-gray-200 p-2 rounded-lg drop-shadow-lg justify-evenly items-center">
        <div className="grow">
          <p className="text-md">Select Service</p>
        </div>
        <div className="flex items-center justify-between grow space-x-2 text-sm">
          <button
            onClick={redirectToCheckout}
            className=" p-1 bg-gray-300 shadow-xl rounded drop-shadow-md hover:bg-gray-400"
          >
            Update/MCS-150
          </button>
          <button className="p-1 bg-gray-300 shadow-xl rounded drop-shadow-md hover:bg-gray-400">
            UCR (0-2)
          </button>
          <button className="p-1 bg-gray-300 shadow-xl rounded drop-shadow-md hover:bg-gray-400">
            UCR (3-5)
          </button>
          <button className="p-1 bg-gray-300 shadow-xl rounded drop-shadow-md hover:bg-gray-400">
            UCR (6-20)
          </button>
          <button className="p-1 bg-gray-300 shadow-xl rounded drop-shadow-md hover:bg-gray-400">
            UCR (21-100)
          </button>
        </div>
      </div>
    </div>
  );
};
