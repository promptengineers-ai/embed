import {useState, useRef} from 'react';
import {
    MainButton, 
    ChatWindow,
    ChatContent,
    ChatInput, 
    InputArea, 
    SubmitButton, 
    FiSendIcon, 
    SiOpenaiIcon,
    AiOutlineCloseIcon,
    ClearIcon,
    SettingsIcon,
    ControlButton,
    ControlButtons,
} from '../styles/EmbedChat.styles';
import {
    WelcomeArea,
    WelcomeHeading,
    WelcomeParagraph,
    ButtonGrid,
    GridButton,
} from '../styles/Welcome.styles';
import { useChatContext } from '../contexts/ChatContext';
import { Welcome } from '../types';

interface EmbedChatProps {
    theme?: any;
    welcome?: Welcome;
}

const EmbedChat: React.FC<EmbedChatProps> = ({ theme, welcome }) => {
    const {
        messages,
        chatboxRef,
        chatboxRefIsEmpty,
        chatPayload,
        setChatPayload,
        sendChatPayload,
        resetChat,
    } = useChatContext();
    const chatInputRef = useRef<HTMLTextAreaElement>(null);
    const [isChatOpen, setChatOpen] = useState(false);
    const [inputRows, setInputRows] = useState(1);

    const toggleChat = () => setChatOpen(!isChatOpen);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendChatPayload();
            submitCleanUp();
        }
    };

    // Event handler for opening settings
    const handleOpenSettings = () => {
        // Placeholder function, replace with your actual logic
        alert("Opened settings");
    };

    const submitCleanUp = () => {
        setInputRows(1);
        setChatPayload({ ...chatPayload, query: "" });
        chatInputRef.current?.focus();
    };

    const calculatedWelcome = {
        buttons: [
            { label: "FAQs", href: "https://example.com" },
            { label: "Contact Us", href: "https://example.com/contact-us" },
            { label: "Support", href: "https://example.com/support" },
            { label: "Feedback", href: "https://example.com/feedback" },
        ],
        ...welcome,
    };

    return (
        <>
            <MainButton onClick={toggleChat} theme={theme}>
                {isChatOpen ? <AiOutlineCloseIcon /> : <SiOpenaiIcon />}
            </MainButton>
            {isChatOpen && (
                <ChatWindow>
                    <ControlButtons>
                        {messages.length > 0 && (
                            <ControlButton onClick={resetChat}>
                                <ClearIcon />
                            </ControlButton>
                        )}
                        <ControlButton onClick={handleOpenSettings}>
                            <SettingsIcon />
                        </ControlButton>
                    </ControlButtons>
                    <ChatContent id="chatbox" ref={chatboxRef}>
                        {chatboxRefIsEmpty && (
                            <WelcomeArea>
                                <WelcomeHeading>
                                    {calculatedWelcome.heading ||
                                        "Prompt Engineers Chat"}
                                </WelcomeHeading>
                                <WelcomeParagraph>
                                    {calculatedWelcome.paragraph ||
                                        "How can I assist you today?"}
                                </WelcomeParagraph>
                                <ButtonGrid>
                                    {calculatedWelcome.buttons?.map(
                                        (item: any, index: number) => {
                                            return (
                                                <GridButton
                                                    key={index}
                                                    onClick={() =>
                                                        alert("Not implemented")
                                                    }
                                                >
                                                    {item.label}
                                                </GridButton>
                                            );
                                        }
                                    )}
                                </ButtonGrid>
                            </WelcomeArea>
                        )}
                    </ChatContent>
                    <InputArea>
                        <ChatInput
                            ref={chatInputRef}
                            rows={inputRows}
                            value={chatPayload.query}
                            onChange={(e) =>
                                setChatPayload({
                                    ...chatPayload,
                                    query: e.target.value,
                                })
                            }
                            placeholder="Type your message here..."
                            onKeyDown={handleKeyDown}
                            style={{ fontSize: "14px" }}
                        />
                        <SubmitButton
                            onClick={() => sendChatPayload()}
                            theme={theme}
                        >
                            <FiSendIcon />
                        </SubmitButton>
                    </InputArea>
                </ChatWindow>
            )}
        </>
    );
};

export default EmbedChat;