import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faTruckFast } from "@fortawesome/free-solid-svg-icons";

const ServiceBox = ({ img, title, desc }) => {
  return (
    <div className="w-full relative max-w-[350px] flex justify-center items-center flex-col">
      {/* bg image ------------------------ */}
      <img src={img} className="w-full clip-img-service h-[300px]" alt="" />
      {/* icon ---------------- */}
      <FontAwesomeIcon
        icon={faTruckFast}
        className="w-[50px] h-[50px]  z-[60]  absolute top-[48%] p-2 right-[15%] rounded-full border-4 border-orange border-solid text-black-900 bg-white"
      />
      <div className="top-[55%] left-1/2 -translate-x-1/2 w-[95%] overflow-visible bg-transparent absolute  shadow-2xl isolate h-[300px]">
        {/* orange border --------- */}
        <div className="clip-box-service absolute bottom-0 left-[0px] h-[310px] w-[100%] z-20 bg-orange"></div>
        {/* main content --------------- */}
        <div className="bg-white clip-box-service  px-4 gap-4 w-full h-full flex flex-col items-start justify-center  relative z-30">
          <h2 className="text-2xl text-black-900 font-bold">{title}</h2>
          <p className="text-black-900 text-base font-normal">{desc}</p>
          <a
            href="#footer"
            className="absolute mt-5 bottom-0 leading-[1] pl-10 flex justify-center items-center gap-3 right-0 readmore bg-orange-400 hover:bg-orange-500 h-[50px] w-[200px] text-white text-[20px]"
          >
            Contact Us{" "}
            <FontAwesomeIcon icon={faArrowRight} className="text-[20px] pt-1" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ServiceBox;
