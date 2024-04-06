import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

const Confessions: React.FC = () => {
  const [confessions, setConfessions] = useState<any[]>([]);

  useEffect(() => {
    const fetchConfessions = async () => {
      try {
        const response = await axios.get(
          "http://172.27.49.120:5173/confessions/"
        );
        setConfessions(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching confessions:", error);
      }
    };

    fetchConfessions();
  }, []);

  return (
    <div>
      <h1 className="text-xl text-black-600 my-4 ml-1 font-semibold">
        Active Confessions
      </h1>
      <div className="bg-white rounded-lg shadow-md p-6 mb-5">
        {confessions.map((confession, index) => (
          <div key={index} className="mb-4 p-4 rounded-lg border bg-white-600">
            {/* User Profile */}
            <div className="flex items-center mb-2">
              <img
                src="https://userpic.codeforces.org/no-avatar.jpg"
                alt="User Avatar"
                width={32}
                height={32}
                className="rounded-full mr-2"
              />
              <span className="text-gray-700 font-semibold">hidden-user</span>
            </div>

            {/* Confession Text */}
            <p className="text-gray-800">{confession.confession}</p>

            {/* Time of Posting */}
            <p className="text-xs text-gray-500">
              {new Date().toLocaleString()}{" "}
              {/* Use actual time of posting here */}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Confessions;
