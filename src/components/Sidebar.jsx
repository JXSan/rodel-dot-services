import React from "react";
import Logo from "../assets/img/rodl-logo.png";
import { NavLink } from "react-router-dom";
import { SignOutButton, useUser, UserButton } from "@clerk/clerk-react";

const styles = {
  wrapper: " bg-white flex flex-col shadow-xl items-center border-r",
  menuOptionsWrapper: "flex flex-col h-3/4 justify-evenly w-full",
  menuOptionButton:
    "border active:bg-blue-400 mx-2 gray-700 font-light p-3 rounded-lg hover:bg-gradient-to-tr hover:from-red-500 hover:to-red-900 hover:text-white",
  signOutContainer: "flex h-1/4 justify-end items-end items-center w-full",
  signOutButton:
    "flex hover:bg-gradient-to-tr hover:from-red-500 hover:to-red-900 hover:text-white shadow-md gap-4 text-sm text-gray-700 font-light px-4 py-1 rounded-lg",
  activeButton:
    "flex mx-6 hover:bg-gradient-to-tr hover:from-red-500 hover:to-red-900 hover:text-white shadow-md items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg bg-gradient-to-tr from-red-500 to-red-900 text-white shadow-md",
  regularButton:
    "flex mx-6 hover:bg-gradient-to-tr hover:from-red-500 hover:to-red-900 hover:text-white shadow-md items-center gap-4 text-sm text-gray-700 font-light px-4 py-1 rounded-lg",
};

const Sidebar = () => {
  const { user } = useUser();
  const isAdmin = user?.unsafeMetadata?.isAdmin;
  return (
    <div className={styles.wrapper}>
      <img className="h-40" src={Logo} alt="" />
      <hr className="w-full" />
      <div className={styles.menuOptionsWrapper}>
        <ul className="flex-col min-w-full flex list-none space-y-4">
          <li className="rounded-lg my-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? styles.activeButton : styles.regularButton
              }
            >
              Search
            </NavLink>
          </li>
          <li className="rounded-lg">
            <NavLink
              to="/dashboard"
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
              to="/ucrdue"
              className={({ isActive }) =>
                isActive ? styles.activeButton : styles.regularButton
              }
            >
              UCR
            </NavLink>
          </li>
          <li className="rounded-lg ">
            <NavLink
              to="/sales"
              className={({ isActive }) =>
                isActive ? styles.activeButton : styles.regularButton
              }
            >
              My Sales
            </NavLink>
          </li>
          {isAdmin && (
            <li className="rounded-lg ">
              <NavLink
                to="/allsales"
                className={({ isActive }) =>
                  isActive ? styles.activeButton : styles.regularButton
                }
              >
                All Sales
              </NavLink>
            </li>
          )}
          {isAdmin && (
            <li className="rounded-lg ">
              <NavLink
                to="/users"
                className={({ isActive }) =>
                  isActive ? styles.activeButton : styles.regularButton
                }
              >
                Users
              </NavLink>
            </li>
          )}
        </ul>
      </div>

      <div className="flex w-full items-center mb-4 justify-evenly">
        <UserButton />
        <SignOutButton className={styles.signOutButton} />
      </div>
    </div>
  );
};

export default Sidebar;
