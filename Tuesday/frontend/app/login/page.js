"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const LoginPage = () => {

    const router = useRouter();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

//   const handleChange = (e) => {
//     return e.target.value;
//   }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  

  const handleLogin = async(e) => {
    e.preventDefault();
    console.log("Logging in with:", loginData);

    const res = await axios.post("http://localhost:5000/users/login", loginData);

    console.log(res.status)

    if(res.status === 200){
        
    localStorage.setItem("token", res.data.data.token);
    router.push("/dashboard")
    }


  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Side: Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 md:px-16 lg:px-24">
        <div className="max-w-md w-full mx-auto">
          <div className="mb-10">
            <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">
              Welcome back
            </h2>
            <p className="text-gray-500 mt-2">
              Please enter your details to sign in.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Email Address
              </label>
              <input
                name="email"
                type="email"
                required
                className="w-full px-4 py-3 text-black rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                placeholder="you@example.com"
                onChange={handleChange}
              />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <label className="text-sm font-semibold text-gray-700">
                  Password
                </label>
              </div>
              <input
                name="password"
                type="password"
                required
                className="w-full px-4 py-3 text-black rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                placeholder="••••••••"
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-xl hover:bg-indigo-700 active:scale-[0.98] transition-all shadow-lg shadow-indigo-100"
            >
              Sign in
            </button>

          </form>

          <p className="mt-8 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <button className="font-bold text-indigo-600 hover:text-indigo-500">
              Sign up for free
            </button>
          </p>
        </div>
      </div>

      {/* Right Side: Decorative/Image (Hidden on mobile) */}
      <div className="hidden lg:block w-1/2 bg-gray-100">
        <img
          src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1470"
          alt="Office space"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
};

export default LoginPage;
