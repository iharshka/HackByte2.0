import React, { useState } from "react";
import AuthPage from "./AuthPage";
import ChatsPage from "./ChatsPage";

interface User {
  username: string;
  secret: string;
}

function CommunityChat() {
  const [user, setUser] = useState<User | any>(undefined);

  if (!user) {
    return <AuthPage onAuth={(userData: User) => setUser(userData)} />;
  } else {
    return (
      <ChatsPage onChat={user} username={user.username} secret={user.secret} />
    );
  }
}

export default CommunityChat;
