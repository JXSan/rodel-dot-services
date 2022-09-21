import React, { useState, useEffect } from "react";
import { getAllCompanies } from "../api/companySnapshot";
import { Link } from "react-router-dom";

const styles = {
  searchInputWrapper: "flex flex-col items-center justify-center w-full h-16",
  searchInput:
    "w-2/4 appearance-none h-14 text-lg hover:bg-gray-50 pl-6 border hover:border-0 border-gray-100 shadow-lg outline-none rounded-md",
  searchResultsWrapper:
    "overflow-hidden overflow-y-auto shadow-md mb-6 w-2/4 bg-gray-200 rounded-md min-h-min max-h-40 mt-[-15px]",
  searchResultsListWrapper: "p-2",
  searchResultItem:
    "mb-4 text-lg text-gray-600 hover:bg-gray-100 rounded-md px-4",
};

const SearchInput = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [companies, setCompanies] = useState([]);

  const fetchCompanies = async () => {
    const response = await getAllCompanies();
    if (response) {
      setCompanies(response);
      console.log(response);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filtered = !searchTerm
    ? []
    : companies?.filter((company) => {
        console.log(company);
        const { usdot, email, dba_name } = company;
        if (
          (usdot != undefined && usdot.includes(searchTerm)) ||
          (email != undefined && email.toLowerCase().includes(searchTerm)) ||
          (dba_name != undefined && dba_name.toLowerCase().includes(searchTerm))
        ) {
          return company;
        }
      });

  useEffect(() => {
    fetchCompanies();
    console.log(companies);
  }, []);

  return (
    <>
      {/* Search DOT Number */}
      <div className={styles.searchInputWrapper}>
        <input
          className={styles.searchInput}
          type="text"
          placeholder="Search DOT#"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      {/* Search DOT Results */}
      <div id="search-results" className={styles.searchResultsWrapper}>
        <ul className={styles.searchResultsListWrapper}>
          {filtered?.map((company) => {
            return (
              <Link to={`/companydetails/${company._id}`}>
                <li key={company?._id} className={styles.searchResultItem}>
                  #{company?.usdot} - {company?.dba_name} - {company?.email}
                </li>
              </Link>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default SearchInput;
