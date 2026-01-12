"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Needed for redirection
import { Mail, Lock, Eye, EyeOff, Sparkles } from "lucide-react";

export default function LoginPage() {
  const router = useRouter(); // Initialize router for navigation

  // State for UI toggles
  const [isSignIn, setIsSignIn] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  // State for Form Data & Errors
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // LOGIN LOGIC
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault(); // Stop page refresh
    setError(""); // Clear previous errors

    // 1. Temporary Hardcoded Check (We will replace this with Database later)
    if (email === "admin@masomo.com" && password === "123456") {
      // SUCCESS: Go to Dashboard
      router.push("/dashboard");
    } else {
      // FAILURE: Show Error
      setError("Incorrect credentials. Try: admin@masomo.com / 123456");
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-white text-black">
      {/* LEFT SIDE - FORM */}
      <div className="flex w-full flex-col justify-center px-8 sm:px-12 md:w-1/2 lg:px-20 xl:px-24">
        
        {/* Logo Section */}
        <div className="mb-8 flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black text-white">
            <Sparkles size={20} />
          </div>
          <span className="text-2xl font-bold text-gray-900">Masomohub</span>
        </div>

        {/* Header Text */}
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">
            {isSignIn ? "Welcome Back Creative!" : "Join Masomohub Today"}
          </h1>
          <p className="text-gray-500">
            {isSignIn
              ? "We Are Happy To See You Again"
              : "Start your learning journey with us"}
          </p>
        </div>

        {/* Toggle Tabs (Sign In / Sign Up) */}
        <div className="mb-8 flex w-full max-w-md rounded-full bg-gray-100 p-1">
          <button
            onClick={() => { setIsSignIn(true); setError(""); }}
            className={`w-1/2 rounded-full py-2.5 text-sm font-semibold transition-all duration-200 ${
              isSignIn
                ? "bg-blue-600 text-white shadow-md"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => { setIsSignIn(false); setError(""); }}
            className={`w-1/2 rounded-full py-2.5 text-sm font-semibold transition-all duration-200 ${
              !isSignIn
                ? "bg-blue-600 text-white shadow-md"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* INPUT FIELDS */}
        <form onSubmit={handleLogin} className="w-full max-w-md space-y-5">
          
          {/* Email Input */}
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 pl-5 text-gray-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              required
            />
            <Mail className="absolute right-5 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          </div>

          {/* Password Input */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 pl-5 text-gray-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Remember Me */}
          {isSignIn && (
            <div className="flex items-center justify-between px-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-500">Remember me</span>
              </label>
              <a href="#" className="text-sm font-medium text-blue-600 hover:underline">
                Forgot Password?
              </a>
            </div>
          )}

          {/* ERROR MESSAGE DISPLAY */}
          {error && (
            <div className="rounded-lg bg-red-50 p-3 text-sm text-red-500 text-center animate-pulse">
              {error}
            </div>
          )}

          {/* Login Button */}
          <button 
            type="submit"
            className="w-full rounded-2xl bg-blue-600 py-4 text-base font-bold text-white shadow-lg shadow-blue-600/20 transition-transform hover:scale-[1.01] active:scale-[0.98]"
          >
            {isSignIn ? "Login" : "Create Account"}
          </button>

          {/* Divider */}
          <div className="relative my-6 flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <span className="relative bg-white px-4 text-xs font-medium uppercase text-gray-400">
              OR
            </span>
          </div>

          {/* Social Buttons */}
          <div className="space-y-3">
             <button type="button" className="flex w-full items-center justify-center gap-3 rounded-2xl border border-gray-800 bg-gray-900 py-3.5 font-medium text-white transition-opacity hover:opacity-90">
              Log in with Apple
            </button>
            <button type="button" className="flex w-full items-center justify-center gap-3 rounded-2xl border border-gray-200 bg-white py-3.5 font-medium text-gray-700 transition-colors hover:bg-gray-50">
              Log in with Google
            </button>
          </div>
        </form>
      </div>

      {/* RIGHT SIDE - IMAGE PLACEHOLDER */}
      <div className="hidden w-1/2 items-center justify-center bg-blue-900 md:flex relative">
         {/* Uncomment the Image component below when you have the file 'public/login-bg.jpg' */}
         {/* <div className="absolute inset-0">
            <Image src="/login-bg.jpg" alt="bg" fill className="object-cover opacity-90" priority />
         </div> 
         */}
         
         <div className="z-10 text-center text-white p-10">
            <h2 className="text-4xl font-bold mb-4">Master New Skills</h2>
            <p className="text-blue-100 max-w-md mx-auto">Join a community of learners and facilitators on Masomohub today.</p>
         </div>
      </div>
    </div>
  );
}