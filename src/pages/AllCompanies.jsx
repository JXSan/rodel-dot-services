// import AllCompaniesGrid from "../components/AllCompaniesGrid";
import React from "react";
import AllCompaniesGrid from "../components/AllCompaniesGrid";

const styles = {
  wrapper: "h-screen w-full flex flex-col items-center justify-center bg-white",
  searchContainer: "flex flex-col w-auto items-center",
  label: "mb-10",
  labelText:
    "font-extrabold text-transparent md:text-6xl lg:text-8xl bg-clip-text bg-gradient-to-r from-red-400 to-red-900",
  buttonSectionWrapper:
    "flex justify-evenly w-6/12 lg:h-20 md:h-16 sm:h-12 lg:text-md md:text-sm",
  button:
    "lg:w-40 md:w-30 lg:p-4 md:p-2 shadow-md rounded-2xl bg-gradient-to-b from-red-500 to-red-800 text-white hover:bg-gradient-to-t hover:from-red-500 hover:to-pink-900 hover:text-white",
};

const AllCompanies = () => {
  return (
    <div className={styles.wrapper}>
      <AllCompaniesGrid />
    </div>
  );
};

export default AllCompanies;
