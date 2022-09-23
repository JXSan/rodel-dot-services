import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getCompanyById,
  blacklistCompany,
  getLatestFromSafer,
} from "../api/companySnapshot";
import NotesHistory from "../components/Notes/NotesHistory";
import { createCharge } from "../api/stripeTransactions";
import { useUser } from "@clerk/clerk-react";
import { getQueues, updateQueueObject } from "../api/queue";
import { getSaleByTransactionId, updateSalesObject } from "../api/sales";
import { createNote } from "../api/notes";
import toast from "react-hot-toast";

const CompanyDetails = () => {
  const [company, setCompany] = useState([]);
  const { id } = useParams(); // Company ID
  const user = useUser();
  const [isCurrentlyDue, setIsCurrentlyDue] = useState(false);
  const [isPastDue, setIsPastDue] = useState(false);
  const [isUCRDue, setIsUCRDue] = useState(false);
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [allQueues, setAllQueue] = useState([]);
  const [currentQueue, setCurrentQueue] = useState([]);
  const [transaction, setTransaction] = useState([]);
  const date = new Date();
  const navigate = useNavigate();

  const MCS150_STRIPE_PRODUCT_ID = "price_1LjmM9Boa9DkGR7IaoPfMpWv";
  const OTHER_PRODUCT_ID = "price_1LjmMKBoa9DkGR7IAxQTD9Lv";

  const refreshCompanyDetails = async () => {
    const updatedCompany = await getLatestFromSafer(id);
    if (updatedCompany) {
      window.location.reload();
      toast.success("Company successfully updated.");
    }
  };

  const completeSale = async (event) => {
    event.preventDefault();
    const date = new Date();
    // Proceed to close out queue
    const updatedSale = await updateSalesObject(
      transaction?.transactionId,
      registrationNumber
    );

    // Close out queue.
    const queueObject = {
      status: "Complete",
      updatedOn: date.toLocaleString(),
    };
    const updatedQueue = await updateQueueObject(currentQueue._id, queueObject);

    // Create a note.
    await createCompanyNote(
      `${currentQueue.serviceType} has been completed, with a confirmation #${registrationNumber}`
    );
    toast.success("Completed sale.");

    window.location.reload();
  };

  const createCompanyNote = async (comment) => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    let yyyy = today.getFullYear();
    const todaysDate = mm + "/" + dd + "/" + yyyy;
    let currentTime =
      new Date().getHours() +
      ":" +
      today.getMinutes() +
      ":" +
      today.getSeconds();

    let noteObject = {
      comment: comment,
      user: user.user,
      date: todaysDate,
      time: currentTime,
      refId: id,
    };

    const note = await createNote(noteObject).catch((err) => {
      console.log(err.message);
    });
  };

  const getSale = async (queue) => {
    const _transaction = await getSaleByTransactionId(queue.transactionId);
    if (_transaction) {
      setTransaction(_transaction.results[0]);
      setCurrentQueue(queue);
    }
  };

  const fetchAllQueues = async () => {
    const queues = await getQueues(id);
    if (queues) {
      for (const q of queues.results) {
        const sale = await getSale(q.transactionId);
        if (sale) {
          q.saleObject = sale;
        }
      }
      setAllQueue(queues.results);
    }
  };

  const checkIsCurrentlyDue = (company) => {
    company = company[0];
    const currentMonth = parseInt(date.getMonth()) + 1;
    const currentYear = parseInt(date.getFullYear().toString().slice(-2));
    const isEvenYear = currentYear % 2 == 0;

    const mc150FormDate = new Date(company?.mcs_150_form_date);
    const mc150_year = parseInt(mc150FormDate.getFullYear());
    const mc150_month = parseInt(mc150FormDate.getMonth() + 1);
    const dotData = company?.usdot.slice(-2);
    const dotYear = parseInt(dotData?.split("")[0]);
    let dotMonth = parseInt(dotData?.split("")[1]);
    if (dotMonth === 0) dotMonth = 10;

    console.log(`MCS150 Month: ${mc150_month}`);
    console.log(`Current Month: ${currentMonth}`);
    console.log(`DOT Month: ${dotMonth}`);

    if (dotMonth == currentMonth) {
      if (
        (isEvenYear && dotYear % 2 == 0) ||
        (!isEvenYear && dotYear % 2 != 0)
      ) {
        if (mc150_month) {
          if (mc150_month < currentMonth) {
            const minYearAccepted = new Date().getFullYear() - 4;
            if (mc150_year >= minYearAccepted) setIsCurrentlyDue(true);
          }
        }
      }
    }
  };

  const checkIsPastDue = (company) => {
    company = company[0];
    const currentMonth = parseInt(date.getMonth()) + 1;
    const currentYear = date.getFullYear();
    const isEvenYear = currentYear % 2 == 0;

    const mc150FormDate = new Date(company?.mcs_150_form_date);
    const mc150_year = parseInt(mc150FormDate.getFullYear());
    const mc150_month = parseInt(mc150FormDate.getMonth() + 1);
    const dotData = company?.usdot.slice(-2);
    const dotYear = parseInt(dotData?.split("")[0]);
    let dotMonth = parseInt(dotData?.split("")[1]);
    if (dotMonth === 0) dotMonth = 10;

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
          const minYearAccepted = currentYear - 4;
          if (
            mc150_month < currentMonth &&
            mc150_year >= minYearAccepted &&
            mc150_year != currentYear
          )
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
      console.log(response);

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

  const handleUCRButton = async (usdot) => {
    window.open(`https://www.ucr.gov/enforcement/`, "_blank");
  };

  const handleBlacklist = async (usdot, status) => {
    await blacklistCompany(usdot, status);
    window.location.reload();
  };

  const handleMCSUpdate = async () => {
    const { paymentURL } = await createCharge(
      user,
      MCS150_STRIPE_PRODUCT_ID,
      id,
      "MCS150 Registration/Update"
    );
    toast.success("Company successfully blacklisted.");
    window.open(paymentURL, "_blank");
  };

  const handleOtherServices = async () => {
    const { paymentURL } = await createCharge(
      user,
      OTHER_PRODUCT_ID,
      id,
      "RODL Services"
    );
    window.open(paymentURL, "_blank");
  };

  const handleUCRUpdate = async () => {
    navigate(`/ucr/${id}`);
  };

  useEffect(() => {
    fetchCompany();
    fetchAllQueues();
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center">
      {/* Please select a service */}
      <div className="rounded-lg drop-shadow-sm mt-2 w-auto flex flex-col items-center justify-center space-x-4 p-2">
        <div>
          <p className="text-xl font-sans font-bold mb-2">Quick links</p>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={handleMCSUpdate}
            className="p-1 bg-orange-400 shadow-xl text-white font-light rounded drop-shadow-md hover:bg-orange-500"
          >
            UPDATE MCS-150
          </button>
          <button
            onClick={handleUCRUpdate}
            className="p-1 bg-orange-400 shadow-xl text-white font-light rounded drop-shadow-md hover:bg-orange-500"
          >
            UCR REGISTRATION
          </button>
          <button
            onClick={handleOtherServices}
            className="p-1 bg-orange-400 shadow-xl text-white font-light rounded drop-shadow-md hover:bg-orange-500"
          >
            OTHER SERVICES
          </button>
          <button
            onClick={refreshCompanyDetails}
            className="p-1 bg-gray-400 shadow-xl text-white font-light rounded drop-shadow-md hover:bg-orange-500"
          >
            REFRESH COMPANY DETAILS
          </button>
        </div>
      </div>

      {/*  Company Details */}
      <div className="w-full flex space-x-4 mt-2">
        <div className="w-auto flex flex-col items-center space-y-4">
          <p className="text-sm font-bold bg-gray-200 drop-shadow-md rounded-md px-1">
            {`Company Details for #${company[0]?.usdot}`}
          </p>
          <div className="ml-10 font-sm">
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
                        ? new Date(item.mcs_150_form_date).toDateString()
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
                  <div className=" rounded-lg">
                    <div className="text-sm text-gray-500">Last Updated On</div>
                    <div className=" rounded-lg  text-black bg-gray-200">
                      {item?.updatedOn ? item.updatedOn : "Not available"}
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
                          handleUCRButton(item?.usdot);
                        }}
                        className="text-sm p-2 text-black bg-violet-400 rounded-lg"
                      >
                        UCR
                      </button>
                      {item.blacklisted == true && (
                        <button
                          type="button"
                          onClick={() => {
                            handleBlacklist(item?.usdot, false);
                          }}
                          className="text-sm text-white p-2 bg-black rounded-lg"
                        >
                          UN-BLACKLIST
                        </button>
                      )}
                      {!item.blacklisted && (
                        <button
                          type="button"
                          onClick={() => {
                            handleBlacklist(item?.usdot, true);
                          }}
                          className="text-sm text-white p-2 bg-black rounded-lg"
                        >
                          BLACKLIST
                        </button>
                      )}
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
                      {item.blacklisted && (
                        <label className="text-sm text-white text-center font-bold px-1 bg-black rounded-lg">
                          Blacklisted
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
        <div className="w-[20%] h-full border border-gray-400 flex flex-col items-center space-y-2">
          <label className="badge my-2">Queue</label>
          <hr />
          {allQueues &&
            allQueues.map((queue) => {
              return (
                <div>
                  {user.user.unsafeMetadata.isAdmin && (
                    <label
                      onClick={() => getSale(queue)}
                      htmlFor="my-modal-3"
                      className=" p-1 cursor-pointer bg-red-400 text-white font-light hover:bg-red-500 border rounded-md text-sm modal-button"
                    >
                      {queue?.serviceType} - {queue?.status}
                    </label>
                  )}
                  {!user.user.unsafeMetadata.isAdmin && (
                    <label className=" p-1 bg-red-400 text-white font-light hover:bg-red-500 border rounded-md text-sm modal-button">
                      {queue?.serviceType} - {queue?.status}
                    </label>
                  )}
                  {/* <label
                    onClick={() => getSale(queue)}
                    htmlFor="my-modal-3"
                    className=" p-1 cursor-pointer bg-red-400 text-white font-light hover:bg-red-500 border rounded-md text-sm modal-button"
                  >
                    {queue?.serviceType} - {queue?.status}
                  </label> */}

                  <input
                    type="checkbox"
                    id="my-modal-3"
                    className="modal-toggle"
                  />
                  <div className="modal">
                    <div className="modal-box relative">
                      <label
                        htmlFor="my-modal-3"
                        className="btn btn-sm btn-circle absolute right-2 top-2"
                      >
                        ✕
                      </label>
                      <form
                        onSubmit={completeSale}
                        className="container flex flex-col items-start space-y-1 p-2"
                      >
                        <div className="flex space-x-2 justify-center items-center">
                          <label className="badge p-2">Created On:</label>
                          <p>{currentQueue?.createdOn}</p>
                        </div>
                        <div className="flex space-x-2 justify-center items-center">
                          <label className="badge p-2">Customer Name:</label>
                          <p>{transaction?.session?.customer_details?.name}</p>
                        </div>
                        <div className="flex space-x-2 justify-center items-center">
                          <label className="badge p-2">Customer Email:</label>
                          <p>{transaction?.session?.customer_details?.email}</p>
                        </div>
                        <div className="flex space-x-2 justify-center items-center">
                          <label className="badge p-2">Service Type:</label>
                          <p>{currentQueue?.serviceType}</p>
                        </div>
                        <div className="divider-horizontal"></div>
                        <div className="flex space-x-2 justify-center flex-wrap items-center mt-2">
                          <label className=" bg-orange-300 border drop-shadow-md p-1 rounded-md text-sm">
                            {`Please enter ${currentQueue?.serviceType} Confirmation Number`}
                          </label>
                          <input
                            type="text"
                            required
                            onChange={(e) => {
                              setRegistrationNumber(e.target.value);
                            }}
                            value={registrationNumber}
                            className="border p-1 mt-2 rounded-md border-gray-400 focus:ring-0"
                          />
                        </div>
                        <div className="flex justify-center w-full mt-1">
                          <button
                            type="submit"
                            className="p-1 rounded-lg border bg-orange-400 hover:bg-orange-500"
                          >
                            Complete Transaction
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                // <button onClick={handleQueue} className="btn">
                //   {queue?.serviceType} - {queue?.status}
                // </button>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default CompanyDetails;
