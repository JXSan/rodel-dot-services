import { faLocationPin } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Location = () => {
  return (
    <div className="w-full justify-center items-center flex mt-[70px] sm:mt-[120px] px-5">
      <div className="flex justify-center items-center flex-col w-full max-w-[1400px]">
        <div className="flex justify-center items-center flex-col gap-2">
          <h6 className="text-orange text-base font-bold">Location</h6>
          <h1 className="uppercase text-black-900 text-[30px] xsm:text-[50px] font-bold">
            Our Location
          </h1>
          <div className="w-[80px] bg-orange h-1"></div>
        </div>
        <div className="flex mt-[80px] justify-center gap-16 sm:gap-6 flex-wrap items-center w-full">
          <div className="relative w-full max-w-[300px] flex justify-center items-center flex-col">
            <FontAwesomeIcon
              icon={faLocationPin}
              className="w-[50px] h-[50px]  z-[60]  absolute -top-[10%] p-2 right-[15%] rounded-full border-4 border-orange border-solid text-black-900 bg-white"
            />
            <div className=" w-full  bg-transparent  shadow-md isolate h-[200px]">
              {/* orange border --------- */}
              <div className="clip-box-service absolute bottom-0 left-[0px] h-[210px] w-[100%] z-20 bg-orange"></div>
              {/* main content --------------- */}
              <div className="bg-white clip-box-service pt-[30px] px-4 gap-4 w-full h-full flex flex-col items-start justify-center  relative z-30">
                <h2 className="text-2xl text-black-900 font-bold">New York</h2>
                <p className="text-black-900 text-base font-normal">
                  Lorem ipsum, <br /> dolor sit
                </p>
              </div>
            </div>
          </div>
          <div className="relative w-full max-w-[300px] flex justify-center items-center flex-col">
            <FontAwesomeIcon
              icon={faLocationPin}
              className="w-[50px] h-[50px]  z-[60]  absolute -top-[10%] p-2 right-[15%] rounded-full border-4 border-orange border-solid text-black-900 bg-white"
            />
            <div className=" w-full  bg-transparent  shadow-md isolate h-[200px]">
              {/* orange border --------- */}
              <div className="clip-box-service absolute bottom-0 left-[0px] h-[210px] w-[100%] z-20 bg-orange"></div>
              {/* main content --------------- */}
              <div className="bg-white clip-box-service pt-[30px] px-4 gap-4 w-full h-full flex flex-col items-start justify-center  relative z-30">
                <h2 className="text-2xl text-black-900 font-bold">New York</h2>
                <p className="text-black-900 text-base font-normal">
                  Lorem ipsum, <br /> dolor sit
                </p>
              </div>
            </div>
          </div>
          <div className="relative w-full max-w-[300px] flex justify-center items-center flex-col">
            <FontAwesomeIcon
              icon={faLocationPin}
              className="w-[50px] h-[50px]  z-[60]  absolute -top-[10%] p-2 right-[15%] rounded-full border-4 border-orange border-solid text-black-900 bg-white"
            />
            <div className=" w-full  bg-transparent  shadow-md isolate h-[200px]">
              {/* orange border --------- */}
              <div className="clip-box-service absolute bottom-0 left-[0px] h-[210px] w-[100%] z-20 bg-orange"></div>
              {/* main content --------------- */}
              <div className="bg-white clip-box-service pt-[30px] px-4 gap-4 w-full h-full flex flex-col items-start justify-center  relative z-30">
                <h2 className="text-2xl text-black-900 font-bold">New York</h2>
                <p className="text-black-900 text-base font-normal">
                  Lorem ipsum, <br /> dolor sit
                </p>
              </div>
            </div>
          </div>
          <div className="relative w-full max-w-[300px] flex justify-center items-center flex-col">
            <FontAwesomeIcon
              icon={faLocationPin}
              className="w-[50px] h-[50px]  z-[60]  absolute -top-[10%] p-2 right-[15%] rounded-full border-4 border-orange border-solid text-black-900 bg-white"
            />
            <div className=" w-full  bg-transparent  shadow-md isolate h-[200px]">
              {/* orange border --------- */}
              <div className="clip-box-service absolute bottom-0 left-[0px] h-[210px] w-[100%] z-20 bg-orange"></div>
              {/* main content --------------- */}
              <div className="bg-white clip-box-service pt-[30px] px-4 gap-4 w-full h-full flex flex-col items-start justify-center  relative z-30">
                <h2 className="text-2xl text-black-900 font-bold">New York</h2>
                <p className="text-black-900 text-base font-normal">
                  Lorem ipsum, <br /> dolor sit
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Location;
