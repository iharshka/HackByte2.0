import { PrettyChatWindow } from "react-chat-engine-pretty";
import React from "react";

interface ChatsPageProps {
  username: string;
  secret: string;
}

const ChatsPage = (props: any) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Community Chats</h1>
      <p className="text-gray-600">
        Welcome! You are now in the community chat room.
      </p>
      {/* Additional chat functionality can be implemented here */}
      <PrettyChatWindow
        projectId="ae31c5fa-e598-4468-8e6c-555d52d70ff4"
        username={props.user.username}
        secret={props.user.secret}
      />
    </div>
  );
};

export default ChatsPage;
