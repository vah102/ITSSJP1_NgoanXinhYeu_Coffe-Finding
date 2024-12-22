import { ReactNode, useState } from "react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

interface CardProps {
  children?: ReactNode;
}

const CardSignUp: React.FC<CardProps> = ({ children }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPassword(!confirmPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Lấy giá trị từ các trường trong form
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const username = formData.get("username") as string;
    const gmail = formData.get("gmail") as string; 
    const password = formData.get("password") as string;
    const confirmPasswordValue = formData.get("confirmPassword") as string;

    // Kiểm tra xác nhận mật khẩu
    if (password !== confirmPasswordValue) {
      alert("Passwords do not match!");
      return;
    }

    try {
      // Gửi yêu cầu đến API
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, gmail, password }), 
      });

      const data = await response.json();

      if (response.ok) {
        alert("Registration successful!");
        navigate("/signin"); 
      } else {
        alert(data.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Signup failed:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen relative">
      <div className="shadow-lg rounded-lg overflow-hidden w-full sm:w-1/2 md:w-1/2 lg:w-1/2 z-20 flex max-h-[650px]">

        <div className="w-1/2 h-full ">
          <img
            src="https://i.pinimg.com/736x/08/bc/03/08bc031a46c9ffe3d499f988e70957ba.jpg"
            alt="Sign Up Background"
            className="w-full h-[10%] object-cover"
          />
        </div>

        <div className="p-10 bg-orange-50 w-1/2 sm:w-1/2 md:w-1/2 lg:w-1/2 max-h-[650px] overflow-auto">
          {children}
          <h2 className="text-2xl font-bold text-center mb-6">SIGN UP</h2>
          <h3 className="text-center mb-5 mt-5">Welcome to Coffee Finding</h3>
          <form onSubmit={handleSubmit}>
            <div className="mt-10 mb-10">
              <input
                name="username"
                type="text"
                placeholder="Username"
                className="border rounded-lg px-4 py-2 w-full"
                required
              />
            </div>

            <div className="mt-5 mb-10">
              <input
                name="gmail" 
                type="email"
                placeholder="Gmail"
                className="border rounded-lg px-4 py-2 w-full"
                required
              />
            </div>

            <div className="relative mb-10">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="border rounded-lg px-4 py-2 w-full"
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-600"
              >
                {/* SVG Icon */}
              </button>
            </div>

            <div className="relative mb-10">
              <input
                name="confirmPassword"
                type={confirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                className="border rounded-lg px-4 py-2 w-full"
                required
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                aria-label={confirmPassword ? "Hide confirm password" : "Show confirm password"}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-600"
              >
                {/* SVG Icon */}
              </button>
            </div>

            <button type="submit" className="bg-black text-white rounded-lg px-4 py-2 w-full mt-10">
              SIGN UP
            </button>
          </form>

          <p className=" text-black mt-20 flex text-center gap-2">
            Already have an account?{" "}
            <Link className="text-blue-500 hover:underline" to="/signin">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardSignUp;
