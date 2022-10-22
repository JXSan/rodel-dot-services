import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

const Companys = () => {
  return (
    <div className="w-full justify-center items-center flex my-[70px]  sm:my-[120px] px-5">
      <div className="w-full max-w-[1400px]">
        <Splide
          options={{
            perPage: 5,
            width: "100%",
            arrow: true,
            pagination: false,
            gap: "1rem",
            type: "loop",
            perMove: 1,
            breakpoints: {
              1187: {
                perPage: 4,
              },
              900: {
                perPage: 3,
              },
              700: {
                perPage: 2,
              },
              440: {
                perPage: 1,
              },
            },
          }}
        >
          <SplideSlide>
            <div className="w-full flex justify-center items-center h-full">
              <img
                className="contrast-0 w-[80%] object-contain"
                src="/ebay.png"
                alt=""
              />
            </div>
          </SplideSlide>
        </Splide>
      </div>
    </div>
  );
};

export default Companys;
