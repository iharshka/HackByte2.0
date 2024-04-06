import React from "react";
import { MultiChatSocket, MultiChatWindow, useMultiChatLogic } from "react-chat-engine-advanced";

interface ChatPageProps {
    onChat: (user: { username: string, secret: string }) => void;
    username: string;
    secret: string;
}

const ChatsPage: React.FC<ChatPageProps> = ({ onChat, username, secret }) => {
    const chatProps = useMultiChatLogic('ae31c5fa-e598-4468-8e6c-555d52d70ff4', username, secret);

    return (
        <div style={{ height: '100vh' }}>
            <MultiChatSocket {...chatProps} />
            <MultiChatWindow {...chatProps} style={{ height: '100%' }} />
        </div>
    );
};

export default ChatsPage;
