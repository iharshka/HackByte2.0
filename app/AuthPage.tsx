import React from "react";
import axios from "axios";

interface AuthPageProps {
  onAuth: (user: { username: string; secret: string }) => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onAuth }) => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const username = e.currentTarget.username.value;

    try {
      const response = await axios.post("https://localhost:5173/auth", {
        username,
      });
      const userData = { ...response.data, secret: username };
      onAuth(userData);
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <div className="bg-whit py-8 px-4">
      <form onSubmit={handleSubmit} className="w-64">
        <div className="text-gray-600">Choose a username for yourself</div>
        <div className="flex items-center mb-4">
          <label className="mr-2 text-gray-600">Username:</label>
          <input
            className="rounded px-3 py-2 bg-white-800 text-black border-slate-50"
            name="username"
          />
        </div>
        <button
          type="submit"
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-1 px-4 rounded focus:outline-none"
        >
          Chat
        </button>
      </form>
    </div>
  );
};

export default AuthPage;
