import { PrettyChatWindow } from "react-chat-engine-pretty";
import React from "react";

interface ChatsPageProps {
  username: string;
  secret: string;
}
 
const ChatsPage = (props: any) => {
  return (
    <div className="bg-white rounded-lg px-6 pt-1 h-[32rem]">
      <PrettyChatWindow
        projectId="ae31c5fa-e598-4468-8e6c-555d52d70ff4"
        username={props.username}
        secret={props.secret}
      />
    </div>
  );
};

export default ChatsPage;
