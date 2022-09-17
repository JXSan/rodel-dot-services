import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCompanyById, blacklistCompany } from "../api/companySnapshot";
import NotesHistory from "../components/Notes/NotesHistory";
import { createCharge } from "../api/stripeTransactions";
import { useUser } from "@clerk/clerk-react";

const CompanyDetails = () => {
  const [company, setCompany] = useState([]);
  const { id } = useParams(); // Company ID
  const user = useUser();
  const userid = user.user.id;
  const [isCurrentlyDue, setIsCurrentlyDue] = useState(false);
  const [isPastDue, setIsPastDue] = useState(false);
  const [isUCRDue, setIsUCRDue] = useState(false);
  const date = new Date();

  const MCS150_STRIPE_PRODUCT_ID = "price_1LiqTaBoa9DkGR7IvDno57bI";

  const checkIsCurrentlyDue = (company) => {
    company = company[0];
    const currentMonth = parseInt(date.getMonth()) + 1;
    const currentYear = parseInt(date.getFullYear().toString().slice(-2));
    const isEvenYear = currentYear % 2 == 0;

    const dotData = company?.usdot.slice(-2);
    const dotYear = parseInt(dotData?.split("")[0]);
    const dotMonth = parseInt(dotData?.split("")[1]);

    if (dotMonth == currentMonth) {
      if (
        (isEvenYear && dotYear % 2 == 0) ||
        (!isEvenYear && dotYear % 2 != 0)
      ) {
        setIsCurrentlyDue(true);
      }
    }
  };

  const checkIsPastDue = (company) => {
    company = company[0];
    const currentMonth = parseInt(date.getMonth()) + 1;
    const currentYear = date.getFullYear();
    const isEvenYear = currentYear % 2 == 0;

    console.log(company);

    const mc150FormDate = new Date(company?.mcs_150_form_date);
    const mc150_year = parseInt(mc150FormDate.getFullYear());
    const mc150_month = parseInt(mc150FormDate.getMonth());
    const dotData = company?.usdot.slice(-2);
    const dotYear = parseInt(dotData?.split("")[0]);
    const dotMonth = parseInt(dotData?.split("")[1]);

    // Enter if the DOT month is after the current month
    if (dotMonth < currentMonth) {
      // Enter if the DOT year is divisible by 2 and so is the last two digits of the current year
      // Also enter if the DOT year is NOT divisible by 2 and the last two digits of the current year also is NOT divisible by 2.
      if (
        (isEvenYear && dotYear % 2 == 0) ||
        (!isEvenYear && dotYear % 2 != 0)
      ) {
        if (mc150_month && mc150_year) {
          // Enter if the MC150 Form month is before the current month and the MC150 Form year is this year or any year before current.
          //(Might need to add a limit here for MC150 year, to only go 6 years back.)
          if (mc150_month < currentMonth && mc150_year <= currentYear)
            setIsPastDue(true);
        }
      }
    }
  };
  const checkIsUCRDue = (company) => {
    company = company[0];
    const carrier_operation = company?.carrier_operation;
    if (
      carrier_operation.length === 1 &&
      carrier_operation[0] === "Interstate"
    ) {
      setIsUCRDue(true);
    }
  };

  const fetchCompany = async () => {
    const response = await getCompanyById(id);
    if (response) {
      setCompany(response);

      // Check to see if company is currently due, past due and/or needs UCR registration.
      checkIsCurrentlyDue(response);
      checkIsPastDue(response);
      checkIsUCRDue(response);
    }
  };

  const handleSaferButton = async (usdot) => {
    window.open(
      `https://safer.fmcsa.dot.gov/query.asp?query_type=queryCarrierSnapshot&query_param=USDOT&query_string=${usdot}`,
      "_blank"
    );
  };

  const handleBlacklistButton = async (usdot) => {
    await blacklistCompany(usdot);
  };

  const handleMCSUpdate = async () => {
    const { paymentURL } = await createCharge(
      user,
      MCS150_STRIPE_PRODUCT_ID,
      id
    );
    window.open(paymentURL, "_blank");
  };

  const handleUCRUpdate = async () => {};

  useEffect(() => {
    fetchCompany();
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center">
      {/* Please select a service */}
      <div className="bg-gray-400 rounded-lg drop-shadow-md mt-10 w-auto flex items-center justify-center space-x-4 p-2">
        <div>
          <p className="text-xl font-sans font-normal">
            Please select a service:{" "}
          </p>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={handleMCSUpdate}
            className="p-1 bg-gray-300 shadow-xl rounded drop-shadow-md hover:bg-gray-400"
          >
            UPDATE MCS-150
          </button>
          <button className="p-1 bg-gray-300 shadow-xl rounded drop-shadow-md hover:bg-gray-400">
            UCR REGISTRATION
          </button>
        </div>
      </div>

      {/*  Company Details */}
      <div className="w-full flex space-x-4 mt-10">
        <div className="w-auto flex flex-col items-center space-y-4">
          <p className="text-sm font-bold bg-gray-200 drop-shadow-md rounded-md px-1">
            {`Company Details for #${company[0]?.usdot}`}
          </p>
          <div className="ml-10">
            {company.map((item) => {
              return (
                <div className="flex flex-col ">
                  <div className=" rounded-lg">
                    <div className="text-sm text-gray-500">LEGAL NAME</div>
                    <div className=" rounded-lg  text-black bg-gray-200">
                      {item?.legal_name ? item.legal_name : "Not available"}
                    </div>
                  </div>
                  <div className=" rounded-lg">
                    <div className="text-sm text-gray-500">DBA NAME</div>
                    <div className=" rounded-lg  text-black bg-gray-200">
                      {item?.dba_name ? item.dba_name : "Not available"}
                    </div>
                  </div>
                  <div className=" rounded-lg">
                    <div className="text-sm text-gray-500">EMAIL</div>
                    <div className=" rounded-lg  text-black bg-gray-200">
                      {item?.email ? item.email : "Not available."}
                    </div>
                  </div>
                  <div className=" rounded-lg">
                    <div className="text-sm text-gray-500">PHONE</div>
                    <div className=" rounded-lg  text-black bg-gray-200">
                      {item?.phone ? item.phone : "Not available."}
                    </div>
                  </div>
                  <div className=" rounded-lg">
                    <div className="text-sm text-gray-500">USDOT</div>
                    <div className=" rounded-lg  text-black bg-gray-200">
                      {item?.usdot}
                    </div>
                  </div>
                  <div className=" rounded-lg">
                    <div className="text-sm text-gray-500">
                      MCS150 FORM DATE
                    </div>
                    <div className=" rounded-lg  text-black bg-gray-200">
                      {item?.mcs_150_form_date
                        ? item.mcs_150_form_date
                        : "Not available"}
                    </div>
                  </div>
                  <div className=" rounded-lg">
                    <div className="text-sm text-gray-500">
                      OPERATING STATUS
                    </div>
                    <div className=" rounded-lg  text-black bg-gray-200">
                      {item?.operating_status
                        ? item.operating_status
                        : "Not available"}
                    </div>
                  </div>
                  <div className=" rounded-lg">
                    <div className="text-sm text-gray-500">MC MX FF Number</div>
                    <div className=" rounded-lg  text-black bg-gray-200">
                      {item?.mc_mx_ff_numbers
                        ? item.mc_mx_ff_numbers
                        : "Not available"}
                    </div>
                  </div>
                  <div className="mt-4 rounded-lg flex flex-col space-y-2">
                    <div className="flex items-center justify-center space-x-4">
                      <button
                        type="button"
                        onClick={() => {
                          handleSaferButton(item?.usdot);
                        }}
                        className="text-sm p-2 text-white bg-orange-500/80 rounded-lg"
                      >
                        S.A.F.E.R
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          handleBlacklistButton(item?.usdot);
                        }}
                        className="text-sm text-white p-2 bg-black rounded-lg"
                      >
                        BLACKLIST
                      </button>
                    </div>
                    <hr />

                    {/* Labels */}
                    <div className="flex items-center justify-center space-x-4">
                      {isCurrentlyDue && (
                        <label className="text-sm text-center font-bold px-1 bg-yellow-500/80 rounded-lg">
                          Currently Due
                        </label>
                      )}
                      {isPastDue && (
                        <label className="text-sm text-center font-bold text-black px-1 bg-red-400 rounded-lg">
                          Past Due
                        </label>
                      )}
                      {isUCRDue && (
                        <label className="text-sm text-center font-bold text-black px-1 bg-purple-300 rounded-lg">
                          UCR Registration
                        </label>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <NotesHistory />
      </div>
      {/* <div className="grow mt-10">
        <p className="text-md">Select Service</p>
      </div>
      <div className="flex items-center justify-between grow space-x-2 text-sm">
        <button className=" p-1 bg-gray-300 shadow-xl rounded drop-shadow-md hover:bg-gray-400">
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
      </div> */}
    </div>
  );
};

export default CompanyDetails;
