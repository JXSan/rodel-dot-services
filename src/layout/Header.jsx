import { useEffect, useState } from "react";
import Btn from "../components/Btn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faUser,
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignIn,
  useUser,
} from "@clerk/clerk-react";
import { Link } from "react-router-dom";

const Header = () => {
  const user = useUser();
  const emailAddress = user.user
    ? user.user.primaryEmailAddress.emailAddress
    : "";
  const [openHeader, setOpenHeader] = useState(false);
  useEffect(() => {
    if (openHeader) {
      document.querySelector("body").style.overflow = "hidden";
    } else {
      document.querySelector("body").style.overflow = "auto";
    }
  }, [openHeader]);

  return (
    <div className="w-full relative h-[80px] sm:h-[120px] bg-orange-400 flex sm:justify-end justify-between items-center sm:items-start px-5 sm:py-6 sm:px-20">
      <h1 className="text-white text-[40px] font-bold block sm:hidden">
        RODL DOT SERVICES
      </h1>
      {/* //overlay--------------- */}
      <div
        onClick={() => setOpenHeader(false)}
        className={`fixed top-0 sm:hidden left-0 h-screen w-full bg-black opacity-60 z-[90] ${
          openHeader ? "block" : "hidden"
        }`}
      ></div>
      <div className="mb-10 hidden sm:flex justify-center items-center gap-5">
        <a
          className="text-white flex justify-center items-center gap-2 text-base no-underline"
          href="tel:214-764-5573"
        >
          <FontAwesomeIcon icon={faPhone} /> 214 - 764 - 5573
        </a>
        <p className="text-white flex justify-center items-center gap-2 text-base no-underline">
          <FontAwesomeIcon icon={faUser} />{" "}
          <SignedOut>
            <a href="/backoffice">Login</a>
          </SignedOut>
          <SignedIn>
            <p>Logged in as - {emailAddress}</p>
            {user?.user?.unsafeMetadata.status === "active" && (
              <Link
                className="p-2 rounded-sm bg-orange-500  text-orange hover:bg-orange-400 drop-shadow-md"
                to="/backoffice"
              >
                Enter Backoffice
              </Link>
            )}
          </SignedIn>
        </p>
      </div>
      <FontAwesomeIcon
        onClick={() => setOpenHeader((prev) => !prev)}
        className={`${
          openHeader ? "text-black-900" : "text-white"
        } text-2xl cursor-pointer relative z-[110] sm:hidden block`}
        icon={openHeader ? faXmark : faBars}
      />
      <header
        className={`shadow-md flex sm:h-[100px] transition-all duration-1000  z-20 ${
          openHeader ? "right-0" : "-right-[600px]"
        } rounded-xl px-5 sm:absolute h-screen sm:top-full top-0 sm:z-40 z-[100]  fixed sm:left-1/2 justify-between items-center max-w-[400px] w-full sm:max-w-[1400px] bg-orange-500 sm:-translate-x-1/2 sm:-translate-y-1/2`}
      >
        <h1 className="text-white text-[40px] font-bold sm:block hidden">
          RODL
        </h1>
        <div className="flex-col sm:flex-row flex justify-start h-full sm:h-auto sm:p-0 py-16 sm:justify-center  items-center sm:items-center xsm:items-start gap-8 lg:gap-16 sm:w-auto w-full">
          <nav className="flex-col sm:flex-row flex justify-center items-center xsm:items-start sm:items-center gap-8 lg:gap-16">
            <a
              onClick={() => setOpenHeader(false)}
              className="text-white rounded-xl hover:bg-orange-400 p-2 text-lg md:text-xl uppercase font-semibold border-b-4 border-solid border-transparent hover:border-orange transition-all cursor-pointer"
              href="#home"
            >
              Home
            </a>
            <a
              onClick={() => setOpenHeader(false)}
              className="text-white hover:bg-orange-400 rounded-xl p-2 text-lg md:text-xl uppercase font-semibold border-b-4 border-solid border-transparent hover:border-orange transition-all cursor-pointer"
              href="#about"
            >
              About Us
            </a>
            <a
              onClick={() => setOpenHeader(false)}
              className="text-white hover:bg-orange-400 rounded-xl p-2 text-lg md:text-xl uppercase font-semibold border-b-4 border-solid border-transparent hover:border-orange transition-all cursor-pointer"
              href="#services"
            >
              Services
            </a>
            <a
              onClick={() => setOpenHeader(false)}
              className="text-white hover:bg-orange-400 rounded-xl p-2 text-lg md:text-xl uppercase font-semibold border-b-4 border-solid border-transparent hover:border-orange transition-all cursor-pointer"
              href="#faq"
            >
              FAQ
            </a>
          </nav>
          <div className="flex sm:hidden flex-col justify-center items-center xsm:items-start gap-5">
            <a
              className="text-black-900 flex justify-center items-center gap-2 text-base no-underline"
              href="tel:214-764-5573"
            >
              <FontAwesomeIcon icon={faPhone} /> 214 - 764 - 5573
            </a>
            <p className="text-black-900 flex justify-center items-center gap-2 text-base no-underline">
              <FontAwesomeIcon icon={faUser} /> Login
            </p>
          </div>
          <a
            className="uppercase rounded-xl flex items-center font-bold text-white hover:bg-orange-400  h-[50px] md:h-[60px] px-3 md:px-6 text-lg md:text-xl bg-orange-500 border-0"
            href="#footer"
          >
            {" "}
            request a Quote{" "}
          </a>
        </div>
      </header>
    </div>
  );
};

export default Header;
