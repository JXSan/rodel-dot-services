import ServiceBox from "../components/ServiceBox";

const Services = () => {
  return (
    <div
      id="services"
      className="flex justify-center items-center w-full mt-16"
    >
      <div className="flex justify-center items-center w-full max-w-[1400px] flex-col px-5">
        <div className="flex justify-center items-center flex-col gap-2">
          {/* <h6 className="text-orange text-base font-bold">Services</h6> */}
          <h1 className="uppercase text-black-900 text-[30px] xsm:text-[50px] font-bold">
            Our Services
          </h1>
          <div className="w-[80px] bg-orange h-1"></div>
        </div>
        <div className="mt-[50px] lg:mt-[100px] grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3  place-items-center gap-y-52 w-full">
          <ServiceBox
            img={"/sunset-truck.png"}
            title="Biennial Update/Deactivation"
            desc="$149"
          />
          <ServiceBox
            img={"/sunset-truck.png"}
            title="UCR (Unified Carrier Registration)"
            desc="Price starting at $179"
          />
          <ServiceBox
            img={"/sunset-truck.png"}
            title="New DOT Number(s)"
            desc="Call us for more details"
          />
          <ServiceBox
            img={"/sunset-truck.png"}
            title=" MC Number(s) Authority"
            desc="Call us for more details"
          />
        </div>
      </div>
    </div>
  );
};

export default Services;
