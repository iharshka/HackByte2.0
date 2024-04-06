//Code for Signup - User / Mentor
"use client";
import React, { useState } from "react";
import Image from "favicon.ico";
import axios from "axios";
import CommunityChat from "./CommunityChat";
import NavBar from "./dashboard/page";

const SignUpForm = () => {
  const [userFormVisible, setUserFormVisible] = useState(false);
  const [mentorFormVisible, setMentorFormVisible] = useState(false);
  const [loginFormVisible, setLoginFormVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [selectedProfession, setSelectedProfession] = useState("");

  const professions = [
    "Psychiatrist",
    "Counseller",
    "Peer here to guide",
    "Psychologist",
    "General practitioners",
    "Occupational Therapists",
  ]; // Dummy professions

  const handleUserSubmit = () => {
    // Call User Signup API
    axios
      .post("/api/user/signup", { email, username, password })
      .then((response) => {
        console.log("User Signed Up:", response.data);
        <NavBar />;
        // Add any further logic for successful signup
      })
      .catch((error) => {
        console.error("Error signing up user:", error);
        // Add error handling logic
      });
  };

  const handleMentorSubmit = () => {
    // Call Mentor Signup API
    axios
      .post("/api/mentor/signup", {
        email,
        username,
        password,
        selectedProfession,
      })
      .then((response) => {
        console.log("Mentor Signed Up:", response.data);
        // Add any further logic for successful signup
        <NavBar />;
      })
      .catch((error) => {
        console.error("Error signing up mentor:", error);
        // Add error handling logic
      });
  };

  const handleLogin = () => {
    // Handle login logic here
    // Send a GET request using APIs
    // Placeholder for now
    console.log("Username:", username);
    console.log("Password:", password);
    // On successful API calls and status code 200
    <NavBar />;
  };

  // color for bottom hyper links for login and signup
  const bottomlinkcolor = {
    color: "blue",
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-black">
      <div className="flex mb-4 rounded-t-lg overflow-hidden">
        <h1
          className="cursor-pointer bg-white text-black p-4"
          onClick={() => {
            setUserFormVisible(true);
            setMentorFormVisible(false);
            setLoginFormVisible(false);
          }}
        >
          User
        </h1>
        <h1
          className="cursor-pointer bg-white text-black p-4"
          onClick={() => {
            setMentorFormVisible(true);
            setUserFormVisible(false);
            setLoginFormVisible(false);
          }}
        >
          Mentor
        </h1>
      </div>

      {userFormVisible && (
        <form
          className="bg-black shadow-md rounded-b-lg px-8 pt-6 pb-8 mb-4"
          onSubmit={handleUserSubmit}
        >
          <div className="mb-4">
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-black mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign Up User
            </button>
          </div>
          <p className="text-white mt-4">
            Already Signed up?{" "}
            <a
              href="#"
              style={bottomlinkcolor}
              onClick={() => {
                setLoginFormVisible(true);
                setUserFormVisible(false);
                setMentorFormVisible(false);
              }}
            >
              Login here
            </a>
          </p>
        </form>
      )}

      {mentorFormVisible && (
        <form
          className="bg-black shadow-md rounded-b-lg px-8 pt-6 pb-8 mb-4"
          onSubmit={handleMentorSubmit}
        >
          <div className="mb-4">
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="profession"
            >
              Profession
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-grey leading-tight focus:outline-none focus:shadow-outline"
              id="profession"
              value={selectedProfession}
              onChange={(e) => setSelectedProfession(e.target.value)}
              required
            >
              <option disabled value="">
                --Select Profession--
              </option>
              {professions.map((profession) => (
                <option key={profession} value={profession}>
                  {profession}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign Up Mentor
            </button>
          </div>
          <p className="text-white mt-4">
            Already Signed up?{" "}
            <a
              href="#"
              style={bottomlinkcolor}
              onClick={() => {
                setLoginFormVisible(true);
                setUserFormVisible(false);
                setMentorFormVisible(false);
              }}
            >
              Login here
            </a>
          </p>
        </form>
      )}
      {loginFormVisible && (
        <form
          className="bg-black shadow-md rounded-b-lg px-8 pt-6 pb-8 mb-4 relative"
          onSubmit={handleLogin}
        >
          {/* Login Form Inputs */}
          <div className="mb-4">
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-white mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign In
            </button>
          </div>
          <p className="text-white mt-4">
            Not registered yet?{" "}
            <a
              href="#"
              style={bottomlinkcolor}
              onClick={() => {
                setLoginFormVisible(false);
                setUserFormVisible(true);
                setMentorFormVisible(false);
              }}
            >
              Signup here
            </a>
          </p>
        </form>
      )}
    </div>
  );
};

export default SignUpForm;
