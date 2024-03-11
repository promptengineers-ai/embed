import { useState, useRef, useEffect } from "react";
import defaultTheme from "../config/theme";
import {
    MainButton,
    ChatWindow,
    ChatContent,
    ChatInput,
    InputArea,
    SubmitButton,
    FiSendIcon,
    AiOutlineCloseIcon,
    ClearIcon,
    SettingsIcon,
    ControlButton,
    ControlButtons,
} from "../styles/EmbedChat.styles";
import {
    WelcomeArea,
    WelcomeHeading,
    WelcomeParagraph,
    ButtonGrid,
    GridButton,
} from "../styles/Welcome.styles";
import { useChatContext } from "../contexts/ChatContext";
import { Welcome } from "../types";
import DOMPurify from "dompurify";

interface EmbedChatProps {
    theme?: any;
}

const EmbedChat: React.FC<EmbedChatProps> = ({ theme }) => {
    const {
        messages,
        setMessages,
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

    useEffect(() => {
        localStorage.removeItem("chatbox");
    }, []);

    useEffect(() => {
        if (isChatOpen && chatboxRef.current) {
            const chatboxContent = localStorage.getItem("chatbox");
            const messages = localStorage.getItem("messages");
            if (messages) {
                setMessages(JSON.parse(messages));
            }
            if (chatboxContent) {
                chatboxRef.current.innerHTML =
                    DOMPurify.sanitize(chatboxContent);
            }
        }
    }, [isChatOpen]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendChatPayload();
            submitCleanUp();
        }
        if (e.altKey && e.key === "n") {
            e.preventDefault();
            resetChat();
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

    const calculatedButtons =
        theme?.chatWindow?.welcomeButtons ||
        defaultTheme.chatWindow.welcomeButtons;

    return (
        <>
            <MainButton onClick={toggleChat} theme={theme}>
                {isChatOpen ? (
                    <AiOutlineCloseIcon
                        style={{ padding: defaultTheme.button.icon.padding }}
                    />
                ) : (
                    <img
                        src={
                            theme?.button?.icon?.src ||
                            defaultTheme.button.icon.src
                        }
                        alt="Logo"
                        style={{
                            width:
                                theme?.button?.icon?.width ||
                                defaultTheme.button.icon.width,
                            height:
                                theme?.button?.icon?.height ||
                                defaultTheme.button.icon.height,
                            borderRadius:
                                theme?.button?.icon?.borderRadius ||
                                defaultTheme.button.icon.borderRadius,
                        }}
                    />
                )}
            </MainButton>
            {isChatOpen && (
                <ChatWindow theme={theme}>
                    <ControlButtons>
                        {messages.length > 0 && (
                            <ControlButton onClick={resetChat}>
                                <ClearIcon />
                            </ControlButton>
                        )}
                        <ControlButton onClick={handleOpenSettings}>
                            <SettingsIcon fontSize={"20px"} />
                        </ControlButton>
                        {window.innerWidth < 768 && (
                            <ControlButton onClick={toggleChat} theme={theme}>
                                <AiOutlineCloseIcon />
                            </ControlButton>
                        )}
                    </ControlButtons>
                    <ChatContent id="chatbox" ref={chatboxRef}>
                        {chatboxRefIsEmpty && (
                            <WelcomeArea>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                    }}
                                >
                                    <img
                                        src={
                                            theme?.chatWindow?.icon?.src ||
                                            defaultTheme.chatWindow.icon.src
                                        }
                                        alt="logo"
                                        style={{
                                            width:
                                                theme?.chatWindow?.icon
                                                    ?.width ||
                                                defaultTheme.chatWindow.icon
                                                    .width,
                                            height:
                                                theme?.chatWindow?.icon
                                                    ?.height ||
                                                defaultTheme.chatWindow.icon
                                                    .height,
                                            borderRadius:
                                                theme?.chatWindow?.icon
                                                    ?.borderRadius ||
                                                defaultTheme.chatWindow.icon
                                                    .borderRadius,
                                        }} // Adjust the size as needed
                                    />
                                </div>
                                <div style={{ textAlign: "center" }}>
                                    <WelcomeHeading>
                                        {theme?.chatWindow?.title ||
                                            defaultTheme.chatWindow.title}
                                    </WelcomeHeading>
                                    <WelcomeParagraph>
                                        {theme?.chatWindow?.welcomeMessage ||
                                            defaultTheme.chatWindow
                                                .welcomeMessage}
                                    </WelcomeParagraph>
                                </div>
                                <ButtonGrid>
                                    {calculatedButtons.map(
                                        (item: any, index: number) => {
                                            return (
                                                <GridButton
                                                    theme={theme}
                                                    key={index}
                                                    onClick={() =>
                                                        window.open(
                                                            item.href,
                                                            "_blank"
                                                        )
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
                            placeholder={
                                theme?.chatWindow?.chatInput?.placeholder ||
                                defaultTheme.chatWindow.chatInput.placeholder
                            }
                            onKeyDown={handleKeyDown}
                            theme={theme}
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
