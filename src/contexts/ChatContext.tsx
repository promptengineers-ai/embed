import { useContext, createContext, useState, useRef, useEffect, useCallback } from "react";
import { ChatClient } from '../utils/api';
import { ChatContextType } from "../types";
import { IContextProvider } from "../interfaces";

const chatClient = new ChatClient();

const defaultChatContextValue: ChatContextType = {
    loading: false,
    setLoading: () => {}, // Default value
    chatboxRef: { current: null },
    userInputRef: { current: null },
    messages: [],
    setMessages: () => {},
    sendChatPayload: () => {},
    chatPayload: { 
        systemMessage: '', 
        query: '', 
        temperature: 0, 
        model: '', 
        vectorstore: '', 
        functions: [] 
    },
    setChatPayload: () => {},
    resetMessages: () => {}, // Default value
    handleChatboxClick: () => {}, // Default value
    chatboxRefIsEmpty: true,
    setChatboxRefIsEmpty: () => {}, // Default value
    resetChat: () => {}, // Default value
};

const ChatContext = createContext(defaultChatContextValue);
export default function ChatProvider({ children, botId }: IContextProvider & { botId: string }) {
    console.log("botId in ChatProvider:", botId);

    const chatboxRef = useRef<HTMLInputElement | null>(null);
    const [chatboxRefIsEmpty, setChatboxRefIsEmpty] = useState(true);
    const userInputRef = useRef<HTMLInputElement | null>(null);
    const [loading, setLoading] = useState(false);
    const [chatPayload, setChatPayload] = useState({
        systemMessage: 'You are a helpful assistant.',
        query: '',
        temperature: 0,
        model: 'gpt-3.5-turbo-1106',
        vectorstore: '',
        functions: [
            "get_word_length"
        ]
    });
    const [messages, setMessages] = useState([
        {role: 'system', content: ''},
    ]);

    function resetMessages() {
        setMessages([
            {role: 'system', content: ''},
        ]);  
        setChatboxRefIsEmpty(true);
    };

    const resetChat = useCallback(() => {
        setChatboxRefIsEmpty(true);
        while (chatboxRef.current?.firstChild) {
            chatboxRef.current.removeChild(chatboxRef.current.firstChild);
        }
        setMessages([{ role: 'system', content: '' }]);
        setChatPayload(prev => ({
            ...prev,
            _id: '',
            functions: [],
        }));
    }, []);

    function handleChatboxClick(e: MouseEvent) {
        console.log('Chatbox button clicked');
        if ((e.target as HTMLElement).closest('.copy-btn')) {
            console.log('Copy button clicked');
            // 2. Get the code content
            const preElement = (e.target as HTMLElement).closest('pre');
            const codeContent = preElement?.querySelector('code')?.innerText || '';
            console.log(codeContent)
            // 3. Use Clipboard API to copy
            navigator.clipboard.writeText(codeContent).then(() => {
                // Optional: Show a toast or feedback to user saying "Copied to clipboard!"
                alert('Copied to clipboard!');
                return;
            }).catch(err => {
                console.error('Failed to copy: ', err);
            });
        }
    }

    async function updateCallback(
        streamMessages: {role: string, content: string}[]
    ): Promise<void> {
        setMessages(streamMessages);
        setChatPayload({...chatPayload, query: '' });
        userInputRef.current?.focus();
    }

    function sendChatPayload() {
        if (!chatPayload.query) {
            alert('Please enter a message first.');
            return;
        }
        setChatboxRefIsEmpty(false);

        // Create a copy of the current messages
        const updatedMessages = [...messages];

        // Append the user's message to the conversation
        updatedMessages[0].content = localStorage.getItem('systemMessage') || chatPayload.systemMessage;
        updatedMessages.push({role: 'user', content: chatPayload.query});

        // Construct the payload
        const model = localStorage.getItem('model') || chatPayload.model;
        const temperature = parseFloat(localStorage.getItem('temperature') || '') || chatPayload.temperature;
        const payload = {
            model,
            temperature,
            messages: updatedMessages,
        }

        chatClient.sendChatStreamMessage(
            botId,
            payload, 
            updateCallback,
            () => setLoading(false)
        );
    }

  
    useEffect(() => {
        // 1. Add an event listener on the chatbox
        const chatbox = document.getElementById('chatbox');
        chatbox?.addEventListener('click', handleChatboxClick);
        
        userInputRef.current?.focus();

        // Cleanup event listener
        return () => {
            chatbox?.removeEventListener('click', handleChatboxClick);
        };
    }, [messages, userInputRef]);

    useEffect(() => {
		if (messages.length > 1) {
			setChatboxRefIsEmpty(false);
		} else {
			setChatboxRefIsEmpty(true);
		}
	}, [messages]);

    return (
        <ChatContext.Provider
            value={{
                loading,
                setLoading,
                chatboxRef,
                userInputRef,
                resetChat,
                messages,
                setMessages,
                resetMessages,
                chatPayload,
                setChatPayload,
                sendChatPayload,
                handleChatboxClick,
                chatboxRefIsEmpty,
                setChatboxRefIsEmpty,
            }}
        >
            {children}
        </ChatContext.Provider>
    );
}

export function useChatContext(): any {
    return useContext(ChatContext);
}