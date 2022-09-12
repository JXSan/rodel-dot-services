import React, { useEffect, useState } from "react";
import { Menu } from "@headlessui/react";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { getAllStripeTransactions } from "../api/stripeTransactions";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Payments from "../components/Payments";
import axios from "axios";
import { createCharge } from "../api/stripeTransactions";

const PUBLIC_KEY =
  "pk_test_51LRr4ICTs4LHmWdKetBblV6Tj1fGjN7v6gzO12NdoFqdqF2mx8ALhe9johK9aa3Qj0NUh0ZEFnNSd8Y0lgAweM0h00JfpbZ56h";

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

let stripePromise;

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(
      "pk_test_51LRr4ICTs4LHmWdKetBblV6Tj1fGjN7v6gzO12NdoFqdqF2mx8ALhe9johK9aa3Qj0NUh0ZEFnNSd8Y0lgAweM0h00JfpbZ56h"
    );
  }
  return stripePromise;
};

export const Sales = () => {
  const [allTransations, setAllTransactions] = useState([]);
  const [serviceSelected, setServiceSelected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [stripeError, setStripeError] = useState(false);
  const [rows, setRows] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  // All serivices
  const updateMCS150 = {
    price: "price_1LdlcACTs4LHmWdKYpqwkI9i",
    quantity: 1,
  };

  const checkoutOptions = {
    lineItems: [updateMCS150],
    mode: "payment",
    successUrl: `${window.location.origin}/success`,
    cancelUrl: `${window.location.origin}/sales`,
  };

  const redirectToCheckout = async () => {
    const stripe = await getStripe();
    stripe.redirectToCheckout(checkoutOptions).then((res) => {
      console.log("Thanks");
    });
    // if (result) console.log(result);
    // console.log(error);
  };

  // const updateMCS150 = async () => {};

  // const redirectToCheckout = async () => {
  //   // setLoading(true);
  //   // console.log("redirectToCheckout");
  //   // const promise = await loadStripe(PUBLIC_KEY);

  //   const response = await createCharge("100", "TEST");
  //   console.log("Got a response: ", response);

  //   // promise.redirectToCheckout(checkoutOptions).then((res) => {
  //   //   console.log("Works");
  //   //   console.log(res);
  //   // });
  //   // console.log("Stripe checkout error", error);

  //   // if (error) setStripeError(error.message);
  //   setLoading(false);
  // };

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
    <div className="w-full h-full flex items-center justify-center flex-col">
      <div className="w-full  px-4 py-2 rounded-lg flex flex-col">
        <div className="w-full h-96">
          <DataGrid className="" rows={rows} columns={columns} pageSize={15} />
        </div>
        {/* <div className="w-auto flex mb-2">
          <div class="dropdown dropdown-hover dropdown-bottom">
            <label tabindex="0" class="btn m-1">
              Please select a service
            </label>
            <ul
              tabindex="0"
              class=" dropdown-content flex flex-col menu p-2 space-y-4 shadowrounded-box "
            >
              <button className="btn bg-red-400" onClick={redirectToCheckout}>
                <a>Update/MCS-150</a>
              </button>
              <button className="btn bg-red-400" onClick={redirectToCheckout}>
                <a>UCR Registration</a>
              </button>
            </ul>
          </div>
        </div> */}
      </div>
      <div className="w-full flex ml-10 space-x-4">
        <button onClick={redirectToCheckout} className="btn">
          Update/MCS-150
        </button>
        <button className="btn">UCR (0-2)</button>
        <button className="btn">UCR (3-5)</button>
        <button className="btn">UCR (6-20)</button>
        <button className="btn">UCR (21-100)</button>
      </div>
    </div>
  );
};
