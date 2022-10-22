import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruckRampBox } from "@fortawesome/free-solid-svg-icons";

const Choose = () => {
  return (
    <div className="flex justify-center items-center w-full isolate mt-[280px] relative">
      <img
        src="/choose.jpg"
        className="absolute top-0 left-0 w-full h-full object-cover -z-[2]"
        alt=""
      />
      <div className="absolute top-0 left-0 w-full h-full object-cover -z-[1] bg-orange opacity-90"></div>
      <div className="flex justify-center items-center w-full max-w-[1400px] flex-col gap-7 px-5 py-[60px]">
        <div className="flex justify-center items-center flex-col gap-2">
          <h1 className="uppercase text-white text-[30px] xsm:text-[50px] font-bold">
            Why Choose Us
          </h1>
          <div className="w-[80px] bg-white h-1"></div>
        </div>
        <div className="grid grid-col-1 lg:grid-cols-2  w-full lg:gap-8 gap-14 mt-9">
          <div className="flex justify-center items-center gap-7">
            <FontAwesomeIcon
              className="text-white border-dashed border-2 border-white rounded-full w-[80px] h-[80px] p-[15px]"
              icon={faTruckRampBox}
            />
            <div className="flex justify-center items-start flex-col gap-2">
              <h2 className="font-bold text-xl text-white">Placeholder Text</h2>
              <p className="text-white text-base font-light ">
                Express delivery innovative services logistic delivery
              </p>
            </div>
          </div>
          <div className="flex justify-center items-center gap-7">
            <FontAwesomeIcon
              className="text-white border-dashed border-2 border-white rounded-full w-[80px] h-[80px] p-[15px]"
              icon={faTruckRampBox}
            />
            <div className="flex justify-center items-start flex-col gap-2">
              <h2 className="font-bold text-xl text-white">Placeholder Text</h2>
              <p className="text-white text-base font-light ">
                Express delivery innovative services logistic delivery
              </p>
            </div>
          </div>
          <div className="flex justify-center items-center gap-7">
            <FontAwesomeIcon
              className="text-white border-dashed border-2 border-white rounded-full w-[80px] h-[80px] p-[15px]"
              icon={faTruckRampBox}
            />
            <div className="flex justify-center items-start flex-col gap-2">
              <h2 className="font-bold text-xl text-white">Placeholder Text</h2>
              <p className="text-white text-base font-light ">
                Express delivery innovative services logistic delivery
              </p>
            </div>
          </div>
          <div className="flex justify-center items-center gap-7">
            <FontAwesomeIcon
              className="text-white border-dashed border-2 border-white rounded-full w-[80px] h-[80px] p-[15px]"
              icon={faTruckRampBox}
            />
            <div className="flex justify-center items-start flex-col gap-2">
              <h2 className="font-bold text-xl text-white">Placeholder Text</h2>
              <p className="text-white text-base font-light ">
                Express delivery innovative services logistic delivery
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Choose;
