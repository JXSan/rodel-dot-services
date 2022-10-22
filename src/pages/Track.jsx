import Btn from "../components/Btn";

const Track = () => {
  return (
    <div className="flex justify-center items-center w-full mb-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full max-w-[1400px] grid-rows-[500px_500px] lg:grid-rows-[500px]">
        <div className="flex justify-center items-start relative w-full h-full isolate">
          <img
            src="/track1.jpg"
            className="absolute left-0 top-0 w-full h-full object-cover -z-20"
            alt=""
          />
          <div className="absolute left-0 top-0 w-full h-full bg-black opacity-50 -z-10"></div>
          <div className="flex justify-center items-start flex-col px-5 sm:px-9 h-full w-full">
            <h1 className="text-white font-bold text-[25px] sm:text-[35px] uppercase">
              GET INSTANT QUOTES
            </h1>
            <div className="w-[40px] bg-orange h-1"></div>
            <p className="text-white font-light text-base my-6 max-w-[95%]">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit
              eveniet, sed eos praesentium maiores, sequi doloremque non
              laboriosam sunt a consectetur sapiente sint reiciendis voluptatum
              mollitia odio perferendis rerum ad.
            </p>
            <Btn text={"Request a quote"} />
          </div>
        </div>
        <div className="flex justify-center items-start relative w-full h-full isolate">
          <img
            src="/track2.jpg"
            className="absolute left-0 top-0 w-full h-full object-cover -z-20"
            alt=""
          />
          <div className="absolute left-0 top-0 w-full h-full bg-orange opacity-90 -z-10"></div>
          <div className="flex justify-center items-start flex-col px-5 sm:px-9 h-full w-full">
            <h1 className="text-white font-bold text-[25px] sm:text-[35px] uppercase">
              Track your shipments
            </h1>
            <div className="w-[40px] bg-white h-1"></div>
            <p className="text-white font-light text-base my-6 max-w-[95%]">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit
              eveniet, sed eos praesentium maiores, sequi doloremque non
              laboriosam sunt a consectetur sapiente sint reiciendis voluptatum
              mollitia odio perferendis rerum ad.
            </p>
            <Btn text={"Track Shipments"} inverse />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Track;
