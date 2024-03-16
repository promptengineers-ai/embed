import { useState, useEffect } from "react";
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
    StarterButton,
} from "../styles/Welcome.styles";
import { useChatContext } from "../contexts/ChatContext";
import DOMPurify from "dompurify";
import Spinner from "./Spinner";
import { truncate } from "../utils/format";

const EmbedChat: React.FC = () => {
    const {
        merged,
        loading,
        setMessages,
        chatboxRef,
        chatInputRef,
        chatboxRefIsEmpty,
        chatPayload,
        setChatPayload,
        sendChatPayload,
        resetChat,
    } = useChatContext();
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

    return (
        <>
            <MainButton onClick={toggleChat} theme={merged}>
                {isChatOpen ? (
                    <AiOutlineCloseIcon
                        style={{
                            padding: merged.button.padding,
                            fontSize: merged.button.icon.fontSize,
                        }}
                    />
                ) : (
                    <img
                        src={merged.button.icon.src}
                        alt="Logo"
                        style={{
                            width: merged.button.icon.width,
                            height: merged.button.icon.height,
                            borderRadius: merged.button.icon.borderRadius,
                        }}
                    />
                )}
            </MainButton>
            {isChatOpen && (
                <ChatWindow theme={merged}>
                    <ControlButtons>
                        {!chatboxRefIsEmpty && (
                            <ControlButton onClick={resetChat}>
                                <ClearIcon />
                            </ControlButton>
                        )}
                        <ControlButton onClick={handleOpenSettings}>
                            <SettingsIcon fontSize={"20px"} />
                        </ControlButton>
                        {window.innerWidth < 768 && (
                            <ControlButton onClick={toggleChat} theme={merged}>
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
                                        src={merged.chatWindow.icon.src}
                                        alt="logo"
                                        style={{
                                            width: merged.chatWindow.icon.width,
                                            height: merged.chatWindow.icon
                                                .height,
                                            borderRadius:
                                                merged.chatWindow.icon
                                                    .borderRadius,
                                        }}
                                    />
                                </div>
                                <div style={{ textAlign: "center" }}>
                                    <WelcomeHeading>
                                        {merged.chatWindow.title}
                                    </WelcomeHeading>
                                    <WelcomeParagraph>
                                        {merged.chatWindow.welcomeMessage}
                                    </WelcomeParagraph>
                                </div>
                                {merged.chatWindow.welcomeButtons.length >
                                    0 && (
                                    <ButtonGrid>
                                        {merged.chatWindow.welcomeButtons.map(
                                            (item: any, index: number) => {
                                                return (
                                                    <GridButton
                                                        theme={merged}
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
                                )}
                                {merged.chatWindow.starters && (
                                    <div
                                        style={{
                                            display: "flex",
                                            overflowX: "auto",
                                            scrollbarWidth: "thin",
                                        }}
                                    >
                                        <div
                                            style={{
                                                display: "flex",
                                                flexDirection: "row",
                                            }}
                                        >
                                            {merged.chatWindow.starters?.map(
                                                (item: any, index: number) => (
                                                    <StarterButton
                                                        theme={merged}
                                                        key={index}
                                                        onClick={() =>
                                                            setChatPayload(
                                                                (
                                                                    prev: any
                                                                ) => ({
                                                                    ...prev,
                                                                    query: item.template,
                                                                })
                                                            )
                                                        }
                                                    >
                                                        <div
                                                            style={{
                                                                fontWeight:
                                                                    "bold",
                                                            }}
                                                        >
                                                            {item.label}
                                                        </div>
                                                        <div
                                                            style={{
                                                                fontSize:
                                                                    "smaller",
                                                            }}
                                                            title={
                                                                item.template
                                                            }
                                                        >
                                                            {truncate(
                                                                item.template,
                                                                40
                                                            )}
                                                        </div>
                                                    </StarterButton>
                                                )
                                            )}
                                        </div>
                                    </div>
                                )}
                            </WelcomeArea>
                        )}
                    </ChatContent>
                    <InputArea>
                        <ChatInput
                            // disabled={loading}
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
                                merged.chatWindow.chatInput.placeholder
                            }
                            onKeyDown={handleKeyDown}
                            theme={merged}
                        />
                        {loading ? (
                            <Spinner theme={merged} />
                        ) : (
                            <SubmitButton
                                onClick={() => sendChatPayload()}
                                theme={merged}
                                disabled={loading}
                            >
                                <FiSendIcon />
                            </SubmitButton>
                        )}
                    </InputArea>
                </ChatWindow>
            )}
        </>
    );
};

export default EmbedChat;
