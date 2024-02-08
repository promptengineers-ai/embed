import {useState} from 'react'; // Import the useState hook
import {
    MainButton, 
    ChatWindow, 
    ChatInput, 
    InputArea, 
    SubmitButton, 
    FiSendIcon, 
    SiOpenaiIcon,
    AiOutlineCloseIcon,
} from './EmbedChat.styles'; // Import the MainButton component

interface EmbedChatProps {
        hoverColor?: string; // This prop is optional
        position: string;
}

const EmbedChat: React.FC<EmbedChatProps> = ({ hoverColor, position }) => {
    const [isChatOpen, setChatOpen] = useState(false);
    const [message, setMessage] = useState(""); // State to keep track of the message

    const toggleChat = () => setChatOpen(!isChatOpen);
    const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value);
    };
    const handleSubmit = () => {
        console.log(message);
        setMessage("");
    };

    return (
        <>
            <MainButton hoverColor={hoverColor} position={position} onClick={toggleChat}>
                {isChatOpen ? <AiOutlineCloseIcon /> : <SiOpenaiIcon />}
            </MainButton>
            {isChatOpen && (
                <ChatWindow>
                    <div>Chat Window Content</div>
                    <InputArea>
                        <ChatInput
                            rows={1}
                            value={message}
                            onChange={handleMessageChange}
                            placeholder="Type your message here..."
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