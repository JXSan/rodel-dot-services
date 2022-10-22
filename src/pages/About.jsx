import Btn from "../components/Btn";

const About = () => {
  return (
    <div id="about" className="flex justify-center items-center w-full mt-20">
      <div className="flex justify-center xl:justify-between  items-center xl:flex-row flex-col w-full max-w-[1400px] px-5">
        <div className="relative -translate-y-[15%] z-40 flex items-end justify-center">
          <div className="border-8 border-solid border-orange w-full max-w-[500px]">
            <img
              src="/choose.jpg"
              className="w-full h-full object-contain "
              alt=""
            />
          </div>
          <h2 className="bg-orange-400 rounded-3xl text-left translate-x-0 xl:static absolute bottom-0 right-0 p-5  sm:w-[300px] text-white font-bold text-[24px] sm:text-[34px] xl:-translate-x-1/2">
            Rapid <br /> Service and <br /> Support
          </h2>
        </div>
        <div className="flex justify-center items-start flex-col ">
          <h6 className="text-orange-400 text-base font-bold">About Us</h6>
          <h1 className="uppercase text-black-900 text-[30px] xsm:text-[50px] font-bold">
            Welcome to RODL
          </h1>
          <div className="w-[60px] bg-orange-400 h-1 mt-3"></div>
          <p className="text-lg font-light my-5 w-full max-w-full xl:max-w-[650px]">
            We are an agency dedicated to facilitate the process of keeping all
            DOT drivers compliant. Having been in the industry for 15 years we
            understand the paperwork can be overwhelming. This agency was
            founded with the intention of keeping you compliant and on the road.
            Contact us to assist and answer any questions you may have.
          </p>
          {/* <Btn text={"About us"} /> */}
        </div>
      </div>
    </div>
  );
};

export default About;
