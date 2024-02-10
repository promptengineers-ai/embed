// src/Embeddable.tsx
import React from 'react';
import ChatProvider from '../contexts/ChatContext';
import EmbedChat from './EmbedChat';

const Embeddable: React.FC<{id: string}> = (props) => {
    return (
        <ChatProvider>
            <EmbedChat id={props.id} />
        </ChatProvider>  
    );
}

export default Embeddable;
