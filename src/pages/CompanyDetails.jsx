import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCompanyById } from "../api/companySnapshot";
import NotesHistory from "../components/Notes/NotesHistory";

const CompanyDetails = () => {
  const [company, setCompany] = useState([]);
  const { id } = useParams();

  const fetchCompany = async () => {
    const response = await getCompanyById(id);
    if (response) setCompany(response);
    console.log(response);
  };

  useEffect(() => {
    fetchCompany();
  }, []);

  return (
    <div className="w-11/12 flex flex-col items-center">
      {/* <h1 className="text-2xl text-gray-400">Company Details</h1> */}
      {/* Details Section */}
      <div className="w-full flex space-x-4 ">
        <div className="w-auto flex flex-col items-center space-y-4">
          <h1 className="badge">Company Details</h1>
          <div>
            {company.map((item) => {
              return (
                <div className="flex flex-col w-full  space-y-2 ">
                  <div className=" rounded-lg">
                    <div className="text-sm text-gray-500">LEGAL NAME</div>
                    <div className="p-2 rounded-lg  text-black bg-gray-200">
                      {item?.legal_name ? item.legal_name : "Not available"}
                    </div>
                  </div>
                  <div className=" rounded-lg">
                    <div className="text-sm text-gray-500">DBA NAME</div>
                    <div className="p-2 rounded-lg  text-black bg-gray-200">
                      {item?.dba_name ? item.dba_name : "Not available"}
                    </div>
                  </div>
                  <div className=" rounded-lg">
                    <div className="text-sm text-gray-500">EMAIL</div>
                    <div className="p-2 rounded-lg  text-black bg-gray-200">
                      {item?.email ? item.email : "Not available."}
                    </div>
                  </div>
                  <div className=" rounded-lg">
                    <div className="text-sm text-gray-500">PHONE</div>
                    <div className="p-2 rounded-lg  text-black bg-gray-200">
                      {item?.phone ? item.phone : "Not available."}
                    </div>
                  </div>
                  <div className=" rounded-lg">
                    <div className="text-sm text-gray-500">USDOT</div>
                    <div className="p-2 rounded-lg  text-black bg-gray-200">
                      {item?.usdot}
                    </div>
                  </div>
                  <div className=" rounded-lg">
                    <div className="text-sm text-gray-500">
                      MCS150 FORM DATE
                    </div>
                    <div className="p-2 rounded-lg  text-black bg-gray-200">
                      {item?.mcs_150_form_date
                        ? item.mcs_150_form_date
                        : "Not available"}
                    </div>
                  </div>
                  <div className=" rounded-lg">
                    <div className="text-sm text-gray-500">
                      OPERATING STATUS
                    </div>
                    <div className="p-2 rounded-lg  text-black bg-gray-200">
                      {item?.operating_status
                        ? item.operating_status
                        : "Not available"}
                    </div>
                  </div>
                  <div className=" rounded-lg">
                    <div className="text-sm text-gray-500">MC MX FF Number</div>
                    <div className="p-2 rounded-lg  text-black bg-gray-200">
                      {item?.mc_mx_ff_numbers
                        ? item.mc_mx_ff_numbers
                        : "Not available"}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <NotesHistory />
      </div>
      {/* <NotesInput /> */}
    </div>
  );
};

export default CompanyDetails;
