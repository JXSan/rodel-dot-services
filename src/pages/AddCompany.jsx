import { allGridColumnsSelector } from "@mui/x-data-grid";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { createCompanyByUsdot, getNewCompanies } from "../api/companySnapshot";

const AddCompany = () => {
  const [usdot, setUsdot] = useState("");
  const [searchString, setSearchString] = useState("");

  const handleNewCompanySearch = async (event) => {
    event.preventDefault();

    const newCompaniesCount = getNewCompanies(searchString, 500);
    toast.promise(newCompaniesCount, {
      loading: "Fetching new companies, this may take a minute...",
      success: () => {
        toast.success(`Succesfully added companies. Refreshing page...`);
        setTimeout(() => {
          window.location.reload();
        }, 5000);
      },
      error: "Unable to fetch companies. Please try again.",
    });
  };

  const createNewCompany = async (event) => {
    event.preventDefault();

    const newCompany = await createCompanyByUsdot(usdot);
    if (newCompany) {
      toast.success(`Successfully added DOT: ${newCompany.usdot}`);
    }
  };
  return (
    <div className="w-full flex flex-col items-center justify-center space-y-10">
      <div className="w-full flex flex-col items-center justify-center">
        <h1 className="font-extrabold text-transparent md:text-2xl lg:text-4xl bg-clip-text bg-gradient-to-r from-orange-400 to-orange-900">
          Add Company
        </h1>
        <div className="flex flex-col items-center w-full  pt-6 sm:justify-center sm:pt-0 bg-gray-50">
          <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-lg sm:rounded-lg">
            <form onSubmit={createNewCompany}>
              <div>
                <label
                  htmlFor="usdot"
                  className="block text-sm font-medium text-gray-700 undefined"
                >
                  USDOT
                </label>
                <div className="flex flex-col items-start">
                  <input
                    type="text"
                    onKeyDown={(evt) => evt.key === "e" && evt.preventDefault()}
                    onChange={(event) => {
                      setUsdot(event.target.value);
                    }}
                    required
                    name="name"
                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
              </div>

              <div className="flex items-center mt-4">
                <button
                  type="submit"
                  className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-orange-700 rounded-md hover:bg-orange-600 focus:outline-none focus:bg-orange-600"
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col items-center justify-center">
        <h1 className="font-extrabold text-transparent md:text-2xl lg:text-4xl bg-clip-text bg-gradient-to-r from-orange-400 to-orange-900">
          SCRAPE FROM SAFER
        </h1>
        <div className="flex flex-col items-center w-full  pt-6 sm:justify-center sm:pt-0 bg-gray-50">
          <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-lg sm:rounded-lg">
            <form onSubmit={handleNewCompanySearch}>
              <div>
                <label
                  htmlFor="usdot"
                  className="block text-sm font-medium text-gray-700 undefined"
                >
                  SEARCH
                </label>
                <div className="flex flex-col items-start">
                  <input
                    type="text"
                    onChange={(event) => {
                      setSearchString(event.target.value);
                    }}
                    required
                    name="searchString"
                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
              </div>

              <div className="flex items-center mt-4">
                <button
                  type="submit"
                  className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-orange-700 rounded-md hover:bg-orange-600 focus:outline-none focus:bg-orange-600"
                >
                  SEARCH
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCompany;
