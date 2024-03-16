// src/Embeddable.tsx
import React from "react";
import ChatProvider from "../contexts/ChatContext";
import EmbedChat from "./EmbedChat";
import { BotConfig } from "../interfaces";

const Embeddable: React.FC<BotConfig> = ({ apiHost, id, theme }) => {
    return (
        <ChatProvider id={id} apiHost={apiHost} theme={theme}>
            <EmbedChat />
        </ChatProvider>
    );
};

export default Embeddable;
