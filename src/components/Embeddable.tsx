// src/Embeddable.tsx
import React from 'react';
import ChatProvider from '../contexts/ChatContext';
import EmbedChat from './EmbedChat';
import { Welcome } from '../types';

const Embeddable: React.FC<{
    apiHost: string|undefined, 
    botId: string,
    styles: any,
    welcome?: Welcome,
}> = ({
        apiHost, 
        botId,
        styles,
        welcome
}) => {
    return (
        <ChatProvider 
            apiHost={apiHost} 
            botId={botId}
            styles={styles}
        >
            <EmbedChat styles={styles} welcome={welcome} />
        </ChatProvider>  
    );
}

export default Embeddable;
