// src/Embeddable.tsx
import React from 'react';
import ChatProvider from '../contexts/ChatContext';
import EmbedChat from './EmbedChat';

const Embeddable: React.FC<{botId: string}> = ({botId}) => {
    console.log("Embeddable id:", botId);
    return (
        <ChatProvider botId={botId}>
            <EmbedChat />
        </ChatProvider>  
    );
}

export default Embeddable;
