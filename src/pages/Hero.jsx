import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle } from "@fortawesome/free-regular-svg-icons";

const Hero = () => {
  return (
    <div id="home" className="relative w-full">
      <img
        className="w-full object-cover h-screen max-h-[750px] sm:max-h-[900px]"
        src="/sunset-truck.jpeg"
        alt=""
      />
      <div className="absolute left-0 top-0 w-full h-full bg-black opacity-[0.26] z-20"></div>
      <div className="-translate-x-1/2 absolute flex  max-w-full  px-5 sm:text-left text-center sm:max-w-[1400px] w-full justify-center items-center sm:items-start z-30 flex-col left-1/2 gap-5  top-0 mt-72 -translate-y-1/2">
        <h1 className="text-white font-bold text-[36px] sm:text-[60px] uppercase">
          Have you filed a <br /> Biennial Update?
        </h1>
        <p className="text-white leading-snug text-lg max-w-[600px] sm:text-xl font-normal">
          The Federal Motor Carrier Safety Administration (FMCSA) requires all
          entities under its jurisdiction to update their information every two
          years. You are required to update even if your company has not changed
          its information, is no longer operating interest, or is no longer in
          business.
        </p>
        {/* <h2 className="text-white text-3xl flex justify-center items-center cursor-pointer gap-3">
          <FontAwesomeIcon icon={faPlayCircle} className="text-5xl" /> Watch
        </h2> */}
      </div>
    </div>
  );
};

export default Hero;
