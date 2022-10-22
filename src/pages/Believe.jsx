import { useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

const Believe = () => {
  const [open, setOpen] = useState(1);
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
  return (
    <div
      id="faq"
      className="flex justify-center items-center w-full my-[70px] sm:my-[100px]"
    >
      <div className="flex justify-center items-center flex-col gap-2 w-full max-w-[1400px] px-5">
        <section className="relative pt-24 pb-20 bg-blueGray-50 overflow-hidden">
          <img
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
            src="flaro-assets/images/faqs/gradient.svg"
            alt=""
          />
          <div className="relative z-10 container px-4 mx-auto">
            <div className="md:max-w-4xl mx-auto">
              <h2 className="mb-16 text-3xl md:text-5xl xl:text-10xl text-center font-bold font-heading tracking-px-n leading-none">
                Frequently Asked Questions
              </h2>
              <div className="flex flex-wrap -m-1 border p-4 rounded-lg drop-shadow-sm">
                <Accordion className="" open={open === 1}>
                  <AccordionHeader onClick={() => handleOpen(1)}>
                    When do I have to file my Biennial Update?
                  </AccordionHeader>
                  <AccordionBody>
                    <strong>
                      You are required to file for a biennial update if if any
                      of the following pertains to you: Filling schedule.
                      There's a change in the company's information ((e.g.,
                      address, phone number, driver or vehicle changes, or
                      operations changes). Ceased interstate operations. No
                      longer in business.
                    </strong>
                  </AccordionBody>
                </Accordion>
                <Accordion open={open === 2}>
                  <AccordionHeader onClick={() => handleOpen(2)}>
                    How do I know when I'm due to update?
                  </AccordionHeader>
                  <AccordionBody>
                    Biennial updates schedule is based on the last two digits of
                    your USDOT number: The last digit is the month its due
                    (e.g., 1= January, 2= February, 3=March, 0=October) If the
                    next-to-last digit of its USDOT Number is odd the file
                    updates in every odd-numbered calendar year. If the
                    next-to-last digit of the USDOT Number is even the file its
                    updates in every even-numbered calendar year.
                  </AccordionBody>
                </Accordion>
                <Accordion open={open === 3}>
                  <AccordionHeader onClick={() => handleOpen(3)}>
                    What happens if I fail to file a Biennial Update?
                  </AccordionHeader>
                  <AccordionBody>
                    Failure to complete a Biennial Update will result in
                    deactivation of your USDOT number and may result in civil
                    penalties of up to $1,000 per day, not to exceed $10,000.
                  </AccordionBody>
                </Accordion>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Believe;
