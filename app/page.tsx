//Code for Signup - User / Mentor
"use client";
import React, { useState } from "react";
import Image from "favicon.ico";
import axios from "axios";

const SignUpForm = () => {
  const [userForm, setUserForm] = useState(true);
  const [mentorForm, setMentorForm] = useState(false);
  const [userLoginFormVisible, setUserLoginFormVisible] = useState(false);
  const [mentorLoginFormVisible, setMentorLoginFormVisible] = useState(false);
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

  const handleSubmit = () => {
    if (userLoginFormVisible || mentorLoginFormVisible) {
      if (userForm) handleUserLogin();
      else handleMentorLogin();
    } else {
      if (userForm) handleUserSignIn();
      else handleMentorSignIn();
    }
  };

  const handleUserSignIn = async () => {
    // Call User Signup API
    await axios
      .post("http://localhost:5173/register/" + "user", {
        emailId: email,
        userName: username,
        password: password,
      })
      .then((response) => {
        console.log("User Signed Up:", response.data);
        window.location.href = "/dashboard";
      })
      .catch((error) => {
        console.error("Error signing up user:", error);
        // Add error handling logic
      });
  };

  const handleMentorSignIn = async () => {
    await axios
      .post("http://localhost:5173/register/mentor", {
        mentorEmail: email,
        mentorName: username,
        mentorPassword: password,
        profession: selectedProfession,
      })
      .then((response) => {
        console.log("Mentor Signed Up:", response.data);
        window.location.href = "/dashboard";
        // Add any further logic for successful signup
      })
      .catch((error) => {
        console.error("Error signing up mentor:", error);
        // Add error handling logic
      });
  };

  const handleUserLogin = async () => {
    await axios
      .post("http://localhost:5173/login/user", {
        emailId: email,
        password: password,
      })
      .then((response) => {
        console.log("User Login:", response.data);
        // Add any further logic for successful signup
        window.location.href = "/dashboard";
      })
      .catch((error) => {
        console.error("Error logining in user:", error);
        // Add error handling logic
      });
  };

  const handleMentorLogin = async () => {
    await axios
      .post("http://localhost:5173/login/mentor", {
        mentorEmail: email,
        mentorPassword: password,
      })
      .then((response) => {
        console.log("Mentor Login:", response.data);
        // Add any further logic for successful signup
        window.location.href = "/dashboard";
      })
      .catch((error) => {
        console.error("Error logining in mentor:", error);
        // Add error handling logic
      });
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
            setUserForm(true);
            setMentorForm(false);
            // setUserLoginFormVisible(false);
          }}
        >
          User
        </h1>
        <h1
          className="cursor-pointer bg-white text-black p-4"
          onClick={() => {
            setMentorForm(true);
            setUserForm(false);
            // setUserLoginFormVisible(false);
          }}
        >
          Mentor
        </h1>
      </div>

      <form
        className="bg-black shadow-md rounded-b-lg px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
        method="POST"
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
            name="emailId"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        {userLoginFormVisible || mentorLoginFormVisible ? (
          ""
        ) : (
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
              name="userName"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
        )}
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
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {userLoginFormVisible || mentorLoginFormVisible ? (
          ""
        ) : mentorForm === true ? (
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
              name="profession"
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
        ) : (
          ""
        )}
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {userLoginFormVisible || mentorLoginFormVisible
              ? userForm
                ? "Login as User"
                : "Login as Mentor"
              : userForm === true
              ? "User Sign In"
              : "Mentor Sign In"}
          </button>
        </div>
        {userLoginFormVisible || mentorLoginFormVisible ? (
          <p className="text-white mt-4">
            Not registered yet?{" "}
            <a
              href="#"
              style={bottomlinkcolor}
              onClick={() => {
                setUserLoginFormVisible(false);
                // setUserFormVisible(true);
                // setMentorFormVisible(false);
              }}
            >
              Signup here
            </a>
          </p>
        ) : (
          <p className="text-white mt-4">
            Already Signed up?{" "}
            <a
              href="#"
              style={bottomlinkcolor}
              onClick={() => {
                setUserLoginFormVisible(true);
                // setUserFormVisible(false);
                // setMentorFormVisible(false);
              }}
            >
              Login here
            </a>
          </p>
        )}
      </form>
    </div>
  );
};

export default SignUpForm;
