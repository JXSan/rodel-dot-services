import React from "react";
import Logo from "../assets/img/logo.png";
import { Link, NavLink } from "react-router-dom";
import { Icon } from "@material-tailwind/react";

const styles = {
  wrapper: " bg-white flex flex-col shadow-xl items-center border-r",
  menuOptionsWrapper: "flex flex-col h-3/4 justify-evenly w-full",
  menuOptionButton:
    "border active:bg-blue-400 mx-2 gray-700 font-light p-3 rounded-lg hover:bg-gradient-to-tr hover:from-red-500 hover:to-red-900 hover:text-white",
  signOutContainer: "flex h-1/4 justify-end items-end w-full",
  signOutButton:
    "flex w-full mb-6 mx-6 hover:bg-gradient-to-tr hover:from-red-500 hover:to-red-900 hover:text-white shadow-md items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg",
  activeButton:
    "flex mx-6 hover:bg-gradient-to-tr hover:from-red-500 hover:to-red-900 hover:text-white shadow-md items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg bg-gradient-to-tr from-red-500 to-red-900 text-white shadow-md",
  regularButton:
    "flex mx-6 hover:bg-gradient-to-tr hover:from-red-500 hover:to-red-900 hover:text-white shadow-md items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg",
};

const Sidebar = () => {
  return (
    <div className={styles.wrapper}>
      <img src={Logo} alt="" />
      <hr className="w-full" />
      <div className={styles.menuOptionsWrapper}>
        <ul className="flex-col min-w-full flex list-none space-y-4">
          <li className="rounded-lg my-4">
            <NavLink
              to="/search"
              className={({ isActive }) =>
                isActive ? styles.activeButton : styles.regularButton
              }
              exact
            >
              Search
            </NavLink>
          </li>
          <li className="rounded-lg">
            <NavLink
              to="/dashboard"
              exact
              className={({ isActive }) =>
                isActive ? styles.activeButton : styles.regularButton
              }
            >
              Dashboard
            </NavLink>
          </li>
          <li className="rounded-lg">
            <NavLink
              to="/allcompanies"
              className={({ isActive }) =>
                isActive ? styles.activeButton : styles.regularButton
              }
            >
              All Companies
            </NavLink>
          </li>
          <li className="rounded-lg ">
            <NavLink
              to="/currentlyDue"
              className={({ isActive }) =>
                isActive ? styles.activeButton : styles.regularButton
              }
            >
              Currently Due
            </NavLink>
          </li>
          <li className="rounded-lg ">
            <NavLink
              to="/pastDue"
              className={({ isActive }) =>
                isActive ? styles.activeButton : styles.regularButton
              }
            >
              Past Due
            </NavLink>
          </li>
          <li className="rounded-lg ">
            <NavLink
              to="/sales"
              className={({ isActive }) =>
                isActive ? styles.activeButton : styles.regularButton
              }
            >
              Sales
            </NavLink>
          </li>
          <li className="rounded-lg text-gray-700">
            <NavLink
              to="/maps"
              className={({ isActive }) =>
                isActive ? styles.activeButton : styles.regularButton
              }
            >
              MC 150 Form
            </NavLink>
          </li>
          <li className="rounded-lg text-gray-700">
            <NavLink
              to="/payments"
              className={({ isActive }) =>
                isActive ? styles.activeButton : styles.regularButton
              }
            >
              Payments
            </NavLink>
          </li>
          <li className="rounded-lg text-gray-700">
            <NavLink
              to="/queue"
              className={({ isActive }) =>
                isActive ? styles.activeButton : styles.regularButton
              }
            >
              Queue
            </NavLink>
          </li>
        </ul>
      </div>
      <div className={styles.signOutContainer}>
        <Link className={styles.signOutButton} to="/">
          Sign Out
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
