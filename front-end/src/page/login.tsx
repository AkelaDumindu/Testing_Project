import React, { useState } from "react";
import loginSignupImage from "../assest/login-animation.gif";
import { BiShow, BiHide } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import '../App.css';
import AxiosInstance from '../config/axiosInstance';


const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const login = async () => {
    try {
      const response = await AxiosInstance.post('/users/login', {
        email, password
      });

      console.log(response.data);

      setEmail('');
      setPassword('');

      // Navigate to homepage after login
      navigate('/');

    } catch (error) {
      console.error("Login failed:", error);
    }
  }

  const handleShowPassword = () => {
    setShowPassword(prev => !prev);
  };

  return (
    <div className="p-3 md:p-4">
      <div className="w-full max-w-sm bg-white m-auto flex flex-col p-4">
        <div className="w-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto">
          <img src={loginSignupImage} className="w-full" alt="Login Animation" />
        </div>

        <form className="w-full py-3 flex flex-col">
          <label htmlFor="email" className="text-black">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-2 py-1 bg-slate-200 rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-300 text-black"
          />

          <label htmlFor="password" className="text-black">Password</label>
          <div className="flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-300 text-black">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-200 border-none outline-none"
            />
            <span
              className="flex text-xl cursor-pointer"
              onClick={handleShowPassword}
            >
              {showPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>

          <button
            type="button"
            className="w-full max-w-[150px] m-auto bg-red-500 hover:bg-red-600 cursor-pointer text-white text-xl font-medium text-center py-1 rounded-full mt-4"
            onClick={login}
          >
            Login
          </button>
        </form>
        <p className="text-left text-black text-sm mt-2">
          Already have an account?{" "}
          <Link to={"/signup"} className="text-red-500 underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
