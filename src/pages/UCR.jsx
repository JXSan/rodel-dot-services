import React from "react";

const UCR = () => {
  return (
    <div className="w-full">
      <div className="w-full md:w-96 md:max-w-full mx-auto flex flex-col items-center space-y-4">
        <div className="text-2xl font-semibold font-sans text-gray-500">
          <p>UCR Registration</p>
        </div>
        <div className="p-6 border border-gray-300 sm:rounded-md w-full">
          <form method="POST" action="https://herotofu.com/start">
            <label className="block mb-6">
              <span className="text-gray-700">Years Needing Registration</span>
              <select
                name="present"
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
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </label>
            <label className="block mb-6">
              <span className="text-gray-700">Size of Fleet Bracket?</span>
              <select
                name="present"
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
                <option>0-2</option>
                <option>3-5</option>
                <option>6-20</option>
                <option>21-100</option>
                <option>101-1000</option>
                <option>1000+</option>
              </select>
            </label>
            <label className="block mb-6">
              <span className="text-gray-700">Classification</span>
              <select
                name="present"
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
                <option>Motor Carrier</option>
                <option>Motor Private Carrier</option>
                <option>Broker</option>
                <option>Leasing Company</option>
                <option>Freight Forwarder</option>
              </select>
            </label>
            <label className="block mb-6">
              <span className="text-gray-700">Email address</span>
              <input
                name="email"
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
        <div className="">
          <button className="p-2 rounded-md drop-shadow-md bg-blue-400 hover:bg-blue-500 text-white font-sans">
            Confirm Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default UCR;
