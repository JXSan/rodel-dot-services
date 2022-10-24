import {
  faFacebookF,
  faLinkedinIn,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Btn from "../components/Btn";

const Footer = () => {
  return (
    <div
      id="footer"
      className="flex flex-col justify-center bg-orange-400 items-center w-full px-5 py-10 bg-black-900"
    >
      <div className="flex justify-start lg:gap-0 gap-10 lg:justify-between flex-col lg:flex-row items-start w-full max-w-[1400px]">
        <div className="flex justify-start items-start flex-col gap-6">
          <h1 className="text-white text-[40px] font-bold ">RODL</h1>
          <p className="text-white text-base font-light max-w-[400px]">
            Please use the form below to contact us. One of our agents will
            assist you within 24 hours!
          </p>
          <div className="flex flex-col justify-start items-start gap-2 w-full">
            <h1 className="uppercase text-white font-bold text-[25px]">
              Get In touch
            </h1>

            <form
              action="https://public.herotofu.com/v1/c3231dd0-5177-11ed-9f58-f3ab7f1a635a"
              method="post"
              className="flex text-black justify-center items-center gap-4 flex-col w-full max-w-[400px]"
            >
              <input
                name="Name"
                id="name"
                type="text"
                required
                placeholder="Enter your name"
                className="bg-gray h-[50px] md:h-[60px] pl-3 text-base border-none w-full min-w-[200px]"
              />
              <input
                type="email"
                name="Email"
                id="email"
                required
                placeholder="Enter your email"
                className="bg-gray h-[50px] md:h-[60px] pl-3 text-base border-none w-full min-w-[200px]"
              />
              <input
                type="number"
                placeholder="Enter your phone number"
                className="bg-gray h-[50px] md:h-[60px] pl-3 text-base border-none w-full min-w-[200px]"
                required
              />
              <select
                name="service"
                id="service"
                required
                className="bg-gray h-[50px] md:h-[60px] pl-3 text-base border-none w-full min-w-[200px]"
              >
                <option hidden>Select Service</option>
                <option value="Biennial Update/Deactivation">
                  Biennial Update/Deactivation
                </option>
                <option value="UCR (Unified Carrier Registration)">
                  UCR (Unified Carrier Registration)
                </option>
                <option value="New DOT Number(s)">New DOT Number(s)</option>
                <option value="MC Number(s) Authority">
                  MC Number(s) Authority
                </option>
                <option value="Other">Other</option>
              </select>

              <textarea
                placeholder="Enter your message"
                name="Message"
                required
                id="message"
                className="bg-gray h-[150px] resize-none pt-3 pl-3 text-white text-base border-none w-full min-w-[200px]"
              ></textarea>
              <button
                type="submit"
                className={`uppercase font-bold text-white  h-[50px] md:h-[60px] px-3 md:px-6 text-lg md:text-xl border-solid  border-white bg-transparent bg-orange-500 hover:bg-orange-400 border-0`}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
        <div className="flex justify-start items-start flex-col gap-6">
          <h1 className="text-orange-400 invisible pointer-events-none select-none text-[40px] font-bold lg:block hidden ">
            RODL
          </h1>
          <a
            href="#home"
            className="text-white text-base font-normal uppercase"
          >
            Home
          </a>
          <a
            href="#services"
            className="text-white text-base font-normal uppercase"
          >
            Services
          </a>
          <a href="#faq" className="text-white text-base font-normal uppercase">
            FAQ
          </a>
          <a
            href="#about"
            className="text-white text-base font-normal uppercase"
          >
            About us
          </a>
        </div>
        {/* <div className="flex justify-start items-start flex-col gap-6">
          <h1 className="text-orange invisible pointer-events-none select-none text-[40px] font-bold lg:block hidden ">
            RODL
          </h1>
          <a href="#" className="text-white text-base font-normal uppercase">
            Terms and conditions
          </a>
          <a href="#" className="text-white text-base font-normal uppercase">
            Privacy policy
          </a>
          <a href="#" className="text-white text-base font-normal uppercase">
            Partners
          </a>
          <a href="#" className="text-white text-base font-normal uppercase">
            Contact Us
          </a>
        </div> */}
        <div className="flex justify-start items-start flex-col gap-6">
          <h1 className="text-orange-400 invisible pointer-events-none select-none text-[40px] font-bold lg:block hidden ">
            RODL
          </h1>
          {/* <div className="flex justify-start items-center gap-6">
            <a
              href="#"
              className="bg-gray flex justify-center items-center rounded-full w-[40px] h-[40px] text-[20px]  text-white"
            >
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a
              href="#"
              className="bg-gray flex justify-center items-center rounded-full w-[40px] h-[40px] text-[20px]  text-white"
            >
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a
              href="#"
              className="bg-gray flex justify-center items-center rounded-full w-[40px] h-[40px] text-[20px]  text-white"
            >
              <FontAwesomeIcon icon={faYoutube} />
            </a>
            <a
              href="#"
              className="bg-gray flex justify-center items-center rounded-full w-[40px] h-[40px] text-[20px]  text-white"
            >
              <FontAwesomeIcon icon={faLinkedinIn} />
            </a>
          </div> */}
        </div>
      </div>
      <div className="flex items-center justify-center bg-orange-400 mt-10">
        <p className="text-white w-8/12">
          RODL DOT Services provides compliance services required by the U.S.
          Department of Transportation/FMCSA, but it is not affiliated with the
          U.S. Department of Transportation or the Federal Motor Carrier Safety
          Administration nor any other Government Agency.
        </p>
      </div>
    </div>
  );
};

export default Footer;
