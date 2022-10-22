const Btn = ({ text, inverse }) => {
  return (
    <button
      className={`uppercase font-bold text-white  h-[50px] md:h-[60px] px-3 md:px-6 text-lg md:text-xl ${
        inverse
          ? "border-solid border-[1px] border-white bg-transparent"
          : "bg-orange border-0"
      }`}
    >
      {text}
    </button>
  );
};

export default Btn;
