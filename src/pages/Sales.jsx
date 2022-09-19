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
  const [totalSales, setTotalSales] = useState(0);
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
    { field: "status", headerName: "PAYMENT STATUS", flex: 1 },
    { field: "order_status", headerName: "ORDER STATUS", flex: 1 },
  ];

  const fetchAllUserSales = async () => {
    const response = await getAllUserSales(id);
    if (response) {
      const allRows = response?.results
        .slice(0)
        .reverse()
        .map((transaction) => {
          // Run your totalSales logic here, before the below return statement.
          // You can also filter based off todays date too
          const transactionDate = new Date(
            transaction.createdOn
          ).toLocaleDateString();
          const currentDate = new Date().toLocaleDateString();
          if (transactionDate === currentDate) {
            const amount = 20;
            setTotalSales((prev) => (prev += amount));
          }
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
            order_status: transaction?.confirmationNumber
              ? "Complete"
              : "Not Complete",
            ucrFormData: transaction?.ucrFormData,
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
          <hr className="mt-2" />
          {currentRow.ucrFormData && (
            <div>
              <h3 className="font-bold text-lg">UCR Details</h3>
              <div className="flex items-center justify-start mt-2 space-x-2">
                <label className="font-bold">
                  Years Needing Registration:{" "}
                </label>
                <p>{currentRow.ucrFormData.years}</p>
              </div>
              <div className="flex items-center justify-start mt-2 space-x-2">
                <label className="font-bold">Size of Fleet Bracket: </label>
                <p>{currentRow.ucrFormData.yearsNeedingRegistration}</p>
              </div>
              <div className="flex items-center justify-start mt-2 space-x-2">
                <label className="font-bold"># Of Vehicles: </label>
                <p>{currentRow.ucrFormData.vehicles}</p>
              </div>
              <div className="flex items-center justify-start mt-2 space-x-2">
                <label className="font-bold">Classification: </label>
                <p>{currentRow.ucrFormData.classification}</p>
              </div>
            </div>
          )}
          <hr />
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
          {totalSales && (
            <>
              <div className="stat-title">Todays Total Sales</div>
              <div className="stat-value">{`$${totalSales}`}</div>
              <div className="stat-desc">{new Date().toLocaleDateString()}</div>
            </>
          )}
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
