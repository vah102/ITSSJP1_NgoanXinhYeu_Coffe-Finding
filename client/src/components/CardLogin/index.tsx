import { ReactNode, useState } from "react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

interface CardProps {
  children?: ReactNode;
}

const CardSignIn: React.FC<CardProps> = ({ children }) => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // Extract form data
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;
  
    fetch('http://localhost:3000/auth/login', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      Cookies.set("token", data.token);
      navigate("/");
    })
    .catch(err => {
      console.error('Login failed:', err);
      alert('Login failed. Please check your username and password.')
    });
  };
  

  return (
    <div className="flex justify-center items-center h-screen relative">
      <div className="shadow-lg rounded-lg overflow-hidden w-full sm:w-1/2 md:w-1/2 lg:w-1/2 z-20 flex max-h-[650px]">

        <div className="w-1/2 h-full ">
          <img
            src="https://i.pinimg.com/736x/08/bc/03/08bc031a46c9ffe3d499f988e70957ba.jpg"
            alt="Login Background"
            className="w-full h-[10%] object-cover"
          />
        </div>

        <div className="p-10 bg-orange-50 w-1/2 sm:w-1/2 md:w-1/2 lg:w-1/2 max-h-[650px] overflow-auto">
          {children}
          <h2 className="text-2xl font-bold text-center mb-6">LOG IN</h2>
          <h3 className="text-center mb-5 mt-5">Welcome to Coffee Finding</h3>
          <form onSubmit={handleSubmit}>

            <div className="mt-10 mb-10">
              <input
                type="text"
                placeholder="Username"
                className="border rounded-lg px-4 py-2 w-full"
                name="username"
                required
              />
            </div>

            <div className="relative mb-10 ">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="border rounded-lg px-4 py-2 w-full"
                name="password"
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-600"
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16" width="16" height="16">
                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zm-8 3.5a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-eye-slash" viewBox="0 0 16 16" width="16" height="16">
                    <path d="M8 3.5a4.5 4.5 0 0 0 0 9 4.5 4.5 0 0 0 0-9zM2.3 8c-.1-.3-.3-.6-.5-.9L1 7.9C1.7 9.1 3 10.4 4.5 11.1l1.1-1.1C3.6 10 2.6 9.2 2.3 8zM8 4a4 4 0 0 0-3.8 5.2l1.1-1.1C6.8 7.6 7.3 7 8 7c1.1 0 2.1.7 2.4 1.7l1.1-1.1A4.007 4.007 0 0 0 8 4zM14 8c.1.3.3.6.5.9l1.2-.1C14.3 6.9 12 5.6 10.5 4.9l-1.1 1.1c1 1 1.7 2.4 1.7 3.8zm-1.6 3.5c.4-.4.7-1 .9-1.5l1.2-.1C14.3 11.1 12 12.4 10.5 13.1l-1.1-1.1c1-1 1.7-2.4 1.7-3.8zM7.9 14.4l1.1-1.1c-.5-.5-1.1-.9-1.7-1.2l-1.1 1.1c1 .1 2.1.1 3.1-.1z" />
                  </svg>
                )}
              </button>
            </div>

            <button type="submit" className="bg-black text-white rounded-lg px-4 py-2 w-full mt-10">
              LOG IN
            </button>
          </form>

          <p className=" text-black mt-20 flex text-center gap-2">
            Don't have an account?{" "}
            <Link className="text-blue-500 hover:underline" to="/signup">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardSignIn;
