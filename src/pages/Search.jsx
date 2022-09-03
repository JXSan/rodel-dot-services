import React from "react";
import { Link } from "react-router-dom";
import SearchInput from "../components/SearchInput";

const styles = {
  wrapper: "w-full flex flex-col items-center justify-center",
  searchContainer: "flex flex-col w-full items-center",
  label: "mb-10",
  labelText:
    "font-extrabold text-transparent md:text-6xl lg:text-8xl bg-clip-text bg-gradient-to-r from-red-400 to-red-900",
  buttonSectionWrapper:
    "flex justify-evenly w-6/12 lg:h-20 md:h-16 sm:h-12 lg:text-md md:text-sm",
  button:
    "lg:w-40 md:w-30 lg:p-4 md:p-2 shadow-md rounded-2xl bg-gradient-to-b from-red-500 to-red-800 text-white hover:bg-gradient-to-t hover:from-red-500 hover:to-pink-900 hover:text-white",
};
const Search = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.searchContainer}>
        {/* Label */}
        <div className={styles.label}>
          <h1 className={styles.labelText}>D.O.T SEARCH</h1>
        </div>
        {/* Search DOT Number */}
        <SearchInput />

        {/* Buttons Section */}
        <div className={styles.buttonSectionWrapper}>
          <Link to="/currentlyDue">
            <button className={styles.button}>CURRENTLY DUE</button>
          </Link>
          <Link to="/pastDue">
            <button className={styles.button}>PAST DUE</button>
          </Link>
          <Link to="/ucr">
            <button className={styles.button}>UCR</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Search;
