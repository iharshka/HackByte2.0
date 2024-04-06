"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import CommunityChat from "../CommunityChat";

const NavBar = () => {
  const [activeSection, setActiveSection] = useState("Dashboard");
  const [username, setUsername] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    // Simulate fetching username from API
    axios.get("/api/user").then((response) => {
      setUsername(response.data.username);
    });
  }, []);

  const handleNavItemClick = (section: string) => {
    setActiveSection(section);
  };

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    // Implement logout logic here
    console.log("Logging out...");
  };

  return (
    <div className="flex h-screen">
      {/* Side Navbar */}
      <div className="w-1/5 bg-black text-white">
        <div className="p-4">
          {/* Navbar Logo (optional) */}
          <div className="flex items-center mb-4">
            <h1 className="text-2xl font-bold">Chill Monk</h1>
          </div>
          {/* Navbar Options */}
          <ul>
            <li
              className={`cursor-pointer py-2 px-4 ${
                activeSection === "Dashboard"
                  ? "bg-orange-500 rounded-xl"
                  : "hover:bg-orange-500 hover:rounded-xl"
              }`}
              onClick={() => handleNavItemClick("Dashboard")}
            >
              Dashboard
            </li>
            <li
              className={`cursor-pointer py-2 px-4 ${
                activeSection === "Track & Improve"
                  ? "bg-orange-500 rounded-xl"
                  : "hover:bg-orange-500 hover:rounded-xl"
              }`}
              onClick={() => handleNavItemClick("Track & Improve")}
            >
              Track & Improve
            </li>
            <li
              className={`cursor-pointer py-2 px-4 ${
                activeSection === "Confession Room"
                  ? "bg-orange-500 rounded-xl"
                  : "hover:bg-orange-500 hover:rounded-xl"
              }`}
              onClick={() => handleNavItemClick("Confession Room")}
            >
              Confession Room
            </li>
            <li
              className={`cursor-pointer py-2 px-4 ${
                activeSection === "Immediate Help"
                  ? "bg-orange-500 rounded-xl"
                  : "hover:bg-orange-500 hover:rounded-xl"
              }`}
              onClick={() => handleNavItemClick("Immediate Help")}
            >
              Immediate Help
            </li>

            <li
              className={`cursor-pointer py-2 px-4 ${
                activeSection === "1v1 Counselling"
                  ? "bg-orange-500 rounded-xl"
                  : "hover:bg-orange-500 hover:rounded-xl"
              }`}
              onClick={() => handleNavItemClick("1v1 Counselling")}
            >
              1v1 Counselling
            </li>

            <li
              className={`cursor-pointer py-2 px-4 ${
                activeSection === "Community Chat"
                  ? "bg-orange-500 rounded-xl"
                  : "hover:bg-orange-500 hover:rounded-xl"
              }`}
              onClick={() => handleNavItemClick("Community Chat")}
            >
              Community Chat
            </li>
          </ul>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-gray-100 p-4">
        {/* Top Navbar */}
        <div className="flex justify-end items-center mb-4">
          {/* User Info */}
          <div className="text-sm">
            <span className="mr-2">{username}</span>
            <button
              className="bg-orange-400 hover:bg-orange-500 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
              onClick={handleDropdownToggle}
            >
              User
              <svg
                xmlns="http://www.w3.org/1000/svg"
                className="h-5 w-5 ml-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 12a2 2 0 100-4 2 2 0 000 4zm0 2a2 2 0 100-4 2 2 0 000 4zm0 6a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-10">
                <button
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Main Content Section */}
        <div>
          {/* Render content based on activeSection */}
          {activeSection === "Dashboard" && <Dashboard />}
          {activeSection === "Track & Improve" && <TrackAndImprove />}
          {activeSection === "Confession Room" && <ConfessionRoom />}
          {activeSection === "Immediate Help" && <ImmediateHelp />}
          {activeSection === "1v1 Counselling" && <Onev1chat />}
          {activeSection === "Community Chat" && <Communitychat />}
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        Dashboard Section
      </h1>
      <p className="text-gray-600">
        Welcome to your personalized dashboard. Here you can track your
        progress, view insights, and take actions to improve your well-being.
      </p>
      {/* Additional content can be added here */}
    </div>
  );
};

const TrackAndImprove = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        Track & Improve Section
      </h1>
      <p className="text-gray-600">
        This section allows you to track your progress and take steps to improve
        your well-being.
      </p>
      {/* Additional content specific to Track & Improve can be added here */}
    </div>
  );
};

const ConfessionRoom = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        Confession Room Section
      </h1>
      <p className="text-gray-600">
        Share your thoughts and feelings in a safe space within the Confession
        Room.
      </p>
      {/* Additional content specific to Confession Room can be added here */}
    </div>
  );
};

const ImmediateHelp = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        Immediate Help Section
      </h1>
      <p className="text-gray-600">
        Get immediate assistance and support when you need it most.
      </p>
      {/* Additional content specific to Immediate Help can be added here */}
    </div>
  );
};

const Onev1chat = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        1v1 Counselling Section
      </h1>
      <p className="text-gray-600">
        Chat with a verified mentor anonymously for personalized counselling.
      </p>
      {/* Additional content specific to 1v1 Counselling can be added here */}
    </div>
  );
};

const Communitychat = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        Community Chat Section
      </h1>
      <p className="text-gray-600">
        Engage with the community in real-time conversations and discussions.{" "}
      </p>
      {/* Additional content specific to Community can be added here */}
      <CommunityChat />
    </div>
  );
};

export default NavBar;
