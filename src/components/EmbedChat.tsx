import {useState, useRef, useEffect} from 'react'; // Import the useState hook
import marked from '../config/marked'; // Import the marked library
import DOMPurify from "dompurify";
import {
    MainButton, 
    ChatWindow,
    ChatContent,
    ChatInput, 
    InputArea, 
    SubmitButton, 
    FiSendIcon, 
    MessageContent,
    SiOpenaiIcon,
    AiOutlineCloseIcon,
    Message,
    ClearIcon,
    SettingsIcon,
    ControlButton,
    ControlButtons,
} from './EmbedChat.styles';
import {
    WelcomeArea,
    WelcomeHeading,
    WelcomeParagraph,
    ButtonGrid,
    GridButton,
} from './Welcome.styles';

interface EmbedChatProps {
    hoverColor?: string; // This prop is optional
    position: string;
}

interface ChatMessage {
    sender: 'user' | 'bot';
    text: string;
}

const dummyMessage =`Check out this [link](https://www.example.com)
\`\`\`javascript
console.log('Hello, world!')
\`\`\``;

const EmbedChat: React.FC<EmbedChatProps> = ({ hoverColor, position }) => {
    const chatInputRef = useRef<HTMLTextAreaElement>(null);
    const [isChatOpen, setChatOpen] = useState(false);
    const [inputRows, setInputRows] = useState(1);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState<ChatMessage[]>([]);

    const toggleChat = () => setChatOpen(!isChatOpen);

    const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const currentRows = e.target.value.split('\n').length; // Split text by new lines
        setMessage(e.target.value);
        setInputRows(Math.min(Math.max(currentRows, 1), 8)); // Ensure rows are between 1 and 8
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          handleSubmit();
        }
    };

    // Event handler for clearing messages
    const handleClearMessages = () => {
        setMessages([]);
    };

    // Event handler for opening settings
    const handleOpenSettings = () => {
        // Placeholder function, replace with your actual logic
        console.log('Settings button clicked');
    };

    const parseAndSanitize = (content: string) => {
        const parsedContent = marked.parse(content);
        return DOMPurify.sanitize(parsedContent);
    }

    const submitCleanUp = () => {
        setInputRows(1)
        setMessage("");
        chatInputRef.current?.focus();
    }

    const handleSubmit = async () => {
        if (message.trim() === "") return; // Prevent sending empty messages
      
        const newMessage: ChatMessage = { sender: 'user', text: parseAndSanitize(message) };
        setMessages([...messages, newMessage]);
      
        // Simulate a bot response
        const botResponse: ChatMessage = { sender: 'bot', text: parseAndSanitize(dummyMessage) };
        setMessages(prevMessages => [...prevMessages, botResponse]);
      
        submitCleanUp();
    };

    useEffect(() => {
        if (isChatOpen) {
          chatInputRef.current?.focus();
        }
      }, [isChatOpen]);

    return (
        <>
            <MainButton hoverColor={hoverColor} position={position} onClick={toggleChat}>
                {isChatOpen ? <AiOutlineCloseIcon /> : <SiOpenaiIcon />}
            </MainButton>
            {isChatOpen && (
                <ChatWindow>
                    <ControlButtons>
                        {messages.length > 0 && (
                            <ControlButton onClick={handleClearMessages}>
                                <ClearIcon />
                            </ControlButton>
                        )}
                        <ControlButton onClick={handleOpenSettings}>
                            <SettingsIcon />
                        </ControlButton>
                    </ControlButtons>
                    {messages.length === 0 ? (
                        <WelcomeArea>
                            <WelcomeHeading>Welcome to AI Chat!</WelcomeHeading>
                            <WelcomeParagraph>How can we help you today?</WelcomeParagraph>
                            <ButtonGrid>
                                <GridButton>FAQs</GridButton>
                                <GridButton>Contact Us</GridButton>
                                <GridButton>Support</GridButton>
                                <GridButton>Feedback</GridButton>
                            </ButtonGrid>
                        </WelcomeArea>
                    ) : (
                        <ChatContent>
                            {messages.slice().reverse().map((msg, index) => (
                                <Message key={index} sender={msg.sender}>
                                    <MessageContent dangerouslySetInnerHTML={{ __html: msg.text }} />
                                </Message>
                            ))}
                        </ChatContent>
                    )}
                    <InputArea>
                        <ChatInput
                            ref={chatInputRef}
                            rows={inputRows}
                            value={message}
                            onChange={handleMessageChange}
                            placeholder="Type your message here..."
                            onKeyDown={handleKeyDown}
                        />
                        <SubmitButton onClick={handleSubmit}>
                            <FiSendIcon />
                        </SubmitButton>
                    </InputArea>
                </ChatWindow>
            )}
        </>
      );
};

export default EmbedChat;