// src/Embeddable.tsx
import React from 'react';
import ChatProvider from '../contexts/ChatContext';
import EmbedChat from './EmbedChat';
import { BotConfig } from '../interfaces';

const Embeddable: React.FC<BotConfig> = ({ apiHost, id, theme }) => {
    return (
        <ChatProvider apiHost={apiHost} id={id} theme={theme}>
            <EmbedChat theme={theme} />
        </ChatProvider>
    );
};

export default Embeddable;
