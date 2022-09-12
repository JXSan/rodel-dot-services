import React, { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";

const Success = () => {
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      alert(`Agent Sale Done by: ${user.primaryEmailAddress.emailAddress}`);
    }
  }, []);

  return (
    <div className="w-full h-full flex flex-col space-y-4 items-center justify-center">
      <h1>Payment Confirmed</h1>
      {/* Payment Details */}
      <div className="w-[75%] h-auto p-4 border border-gray-300 flex flex-col">
        <label>Confirmation#: 3R4R3F3</label>
        <label>Agent: jonathansanchez1995@gmail.com</label>
        <label>Created: September 25th, 2022</label>
      </div>
    </div>
  );
};

export default Success;
