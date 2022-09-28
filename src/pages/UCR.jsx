import React from "react";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { createCharge } from "../api/stripeTransactions";
import { useNavigate, useParams } from "react-router-dom";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const fleetMapping = {
  "0-2": { amount: 179, paymentId: "price_1LjmMEBoa9DkGR7IlAwkXPYW" },
  "3-5": { amount: 299, paymentId: "price_1LjmMEBoa9DkGR7IgoGJpsh5" },
  "6-20": { amount: 549, paymentId: "price_1LjmMEBoa9DkGR7I9FEiaYg5" },
  "21-100": { amount: 1429, paymentId: "price_1LjmMEBoa9DkGR7ILXgpAYZh" },
};

const UCR = () => {
  const user = useUser();
  const { id } = useParams(); // Company ID

  const navigate = useNavigate();
  const [years, setYears] = useState([]);
  const [cost, setCost] = useState(0);
  const [formData, setFormData] = useState({});
  const [selectedPaymentId, setPaymentId] = useState("");

  const handleChange = (event) => {
    const id = event.target.id;
    if (id === "yearsNeedingRegistration") {
      setCost(fleetMapping[event.target.value].amount);
      setPaymentId(fleetMapping[event.target.value].paymentId);
    }

    setFormData({ ...formData, [id]: event.target.value });
  };

  const redirectToCheckout = async (productId) => {};

  const handleFleetBracket = async (event) => {
    event.preventDefault();
    const index = event.target.value;
    const amount = fleetMapping[index].amount;
    setCost(amount);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formData.yearsNeedingRegistration) {
      const { paymentURL } = await createCharge(
        user,
        selectedPaymentId,
        id,
        "UCR Registration",
        formData
      );
      window.open(paymentURL, "_blank");
      navigate("/sales");
    }

    // Process payment through stripe
    // await redirectToCheckout(formData);

    // Get the payment url from the backend and navigate there
  };

  useEffect(() => {
    const date = new Date();
    const monthNumber = date.getMonth();
    const month = months[monthNumber];
    const currentYear = date.getFullYear();
    if (monthNumber + 1 >= 10) {
      setYears([currentYear, currentYear + 1]);
    } else setYears([currentYear - 1, currentYear]);
  }, []);

  return (
    <div className="w-full">
      <div className="w-full md:w-96 md:max-w-full mx-auto flex flex-col items-center space-y-4">
        <div className="text-2xl font-semibold font-sans text-gray-500">
          <p>UCR Registration</p>
        </div>
        <div className="p-6 border border-gray-300 sm:rounded-md w-full">
          <form>
            <label className="block mb-6">
              <span className="text-gray-700">Years Needing Registration</span>
              <select
                onChange={handleChange}
                id="years"
                className="
            block
            w-full
            mt-1
            px-2
            p-1
            border-gray-300
            rounded-md
            shadow-sm
            focus:border-indigo-300
            focus:ring
            focus:ring-indigo-200
            focus:ring-opacity-50
          "
              >
                <option hidden>Select an option</option>
                {years?.map((item, index) => {
                  return (
                    <option value={item} key={index}>
                      {item}
                    </option>
                  );
                })}
              </select>
            </label>
            <label className="block mb-6">
              <span className="text-gray-700">Size of Fleet Bracket?</span>
              <select
                onChange={handleChange}
                id="yearsNeedingRegistration"
                className="
            block
            w-full
            mt-1
            px-2
            p-1
            border-gray-300
            rounded-md
            shadow-sm
            focus:border-indigo-300
            focus:ring
            focus:ring-indigo-200
            focus:ring-opacity-50
          "
              >
                <option hidden>Select an option</option>
                <option onChange={handleChange} value={`0-2`}>
                  0-2
                </option>
                <option onChange={handleChange} value={`3-5`}>
                  3-5
                </option>
                <option onChange={handleChange} value={`6-20`}>
                  6-20
                </option>
                <option onChange={handleChange} value={`21-100`}>
                  21-100
                </option>
              </select>
            </label>
            <label className="block mb-6">
              <span className="text-gray-700"># Of Vehicles</span>
              <input
                id="vehicles"
                type="number"
                onChange={handleChange}
                value={formData.vehicles}
                className="
            block
            w-full
            mt-1
            px-2
            p-1
            border-gray-300
            rounded-md
            shadow-sm
            focus:border-indigo-300
            focus:ring
            focus:ring-indigo-200
            focus:ring-opacity-50
          "
                placeholder="0"
              />
            </label>
            <label className="block mb-6">
              <span className="text-gray-700">Classification</span>
              <select
                id="classification"
                onChange={handleChange}
                value={formData.classification}
                className="
            block
            w-full
            mt-1
            px-2
            p-1
            border-gray-300
            rounded-md
            shadow-sm
            focus:border-indigo-300
            focus:ring
            focus:ring-indigo-200
            focus:ring-opacity-50
          "
              >
                <option hidden>Select an option</option>
                <option>Motor Carrier</option>
                <option>Motor Private Carrier</option>
                <option>Broker</option>
                <option>Leasing Company</option>
                <option>Freight Forwarder</option>
              </select>
            </label>
            <label className="block mb-6">
              <span className="text-gray-700">Email Address</span>
              <input
                id="email"
                onChange={handleChange}
                type="email"
                className="
            block
            w-full
            mt-1
            px-2
            p-1
            border-gray-300
            rounded-md
            shadow-sm
            focus:border-indigo-300
            focus:ring
            focus:ring-indigo-200
            focus:ring-opacity-50
          "
                placeholder="email@example.com"
              />
            </label>
            {/* <div className="mb-6">
              <div className="mt-2">
                <div>
                  <label className="inline-flex items-center">
                    <input
                      name="season"
                      type="radio"
                      className="
                  text-indigo-600
                  border-gray-300
                  rounded-full
                  shadow-sm
                  focus:border-indigo-300
                  focus:ring
                  focus:ring-offset-0
                  focus:ring-indigo-200
                  focus:ring-opacity-50
                "
                      checked
                    />
                    <span className="ml-2">I like summer</span>
                  </label>
                </div>
                <div>
                  <label className="inline-flex items-center">
                    <input
                      name="season"
                      type="radio"
                      className="
                  text-indigo-600
                  border-gray-300
                  rounded-full
                  shadow-sm
                  focus:border-indigo-300
                  focus:ring
                  focus:ring-offset-0
                  focus:ring-indigo-200
                  focus:ring-opacity-50
                "
                    />
                    <span className="ml-2">I'm more into winter</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="mb-6">
              <button
                type="submit"
                className="
            h-10
            px-5
            text-indigo-100
            bg-indigo-700
            rounded-lg
            transition-colors
            duration-150
            focus:shadow-outline
            hover:bg-indigo-800
          "
              >
                Send Answers
              </button>
            </div> */}
          </form>
        </div>
        <div className="flex flex-col space-y-2">
          <div className="bg-gray-200 rounded p-1">
            <p>{`Total Cost: $${cost}`}</p>
          </div>
          <button
            type="button"
            onClick={handleSubmit}
            className="p-2 rounded-md drop-shadow-md bg-blue-400 hover:bg-blue-500 text-white font-sans"
          >
            Confirm Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default UCR;
