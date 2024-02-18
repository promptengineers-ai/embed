// src/Embeddable.tsx
import React from 'react';
import ChatProvider from '../contexts/ChatContext';
import EmbedChat from './EmbedChat';

const Embeddable: React.FC<{apiHost: string|undefined, botId: string}> = ({
        apiHost, 
        botId
}) => {
    return (
        <ChatProvider 
            apiHost={apiHost} 
            botId={botId}
        >
            <EmbedChat />
        </ChatProvider>  
    );
}

export default Embeddable;
