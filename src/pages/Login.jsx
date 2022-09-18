import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { signIn } = UserAuth();
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await signIn(email, password);
      navigate("/");
    } catch (e) {
      toast.error(`Error: ${e.message}`);
      setError(e.message);
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="p-4 rounded-md border w-96 h-auto border-gray-400  ">
        <form onSubmit={handleLogin} className="flex w-full flex-col space-y-4">
          <div className="flex flex-col space-y-2 justify-center">
            <label>Email</label>
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered w-full max-w-xs"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
            />
          </div>
          <div className="flex flex-col space-y-2 justify-center">
            <label>Password</label>
            <input
              type="password"
              placeholder="Password"
              className="input input-bordered w-full max-w-xs"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
            />
          </div>
          <div className="flex flex-col space-y-2 justify-center">
            <button
              type="submit"
              className="btn bg-orange-600 w-full hover:glass border-none"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
