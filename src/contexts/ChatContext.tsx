import {
    useContext,
    createContext,
    useState,
    useRef,
    useEffect,
    useCallback,
    useMemo,
} from "react";
import { ChatClient } from "../utils/api";
import { ChatContextType, Message } from "../types";
import { IContextProvider } from "../interfaces";
import { log } from "../utils/log";

const defaultChatContextValue: ChatContextType = {
    loading: false,
    setLoading: () => {},
    chatboxRef: { current: null },
    chatInputRef: { current: null },
    userInputRef: { current: null },
    messages: [],
    setMessages: () => {},
    sendChatPayload: () => {},
    chatPayload: { query: "", history_id: "" },
    setChatPayload: () => {},
    handleChatboxClick: () => {},
    chatboxRefIsEmpty: true,
    setChatboxRefIsEmpty: () => {},
    resetChat: () => {},
};

const ChatContext = createContext(defaultChatContextValue);
export default function ChatProvider({
    children,
    apiHost,
    id,
    theme,
}: IContextProvider & {
    apiHost: string | undefined;
    id: string;
    theme: any;
}) {
    const chatClient = new ChatClient(apiHost, id, theme);
    const chatInputRef = useRef<HTMLInputElement | null>(null);
    const chatboxRef = useRef<HTMLInputElement | null>(null);
    const [chatboxRefIsEmpty, setChatboxRefIsEmpty] = useState(true);
    const userInputRef = useRef<HTMLInputElement | null>(null);
    const [loading, setLoading] = useState(false);
    const [chatPayload, setChatPayload] = useState({
        query: "",
        history_id: "",
    });
    const [messages, setMessages] = useState<Message[]>([]);

    const resetChat = useCallback(() => {
        if (chatboxRefIsEmpty) {
            setChatboxRefIsEmpty(true);
            while (chatboxRef.current?.firstChild) {
                chatboxRef.current.removeChild(chatboxRef.current.firstChild);
            }
            localStorage.removeItem("chatbox");
            localStorage.removeItem("messages");
            setMessages([]);
            setChatPayload((prev) => ({
                ...prev,
                history_id: "",
            }));
            setLoading(false);
        }
        // eslint-disable-next-line
    }, []);

    function handleChatboxClick(e: MouseEvent) {
        if ((e.target as HTMLElement).closest(".copy-btn")) {
            // 2. Get the code content
            const preElement = (e.target as HTMLElement).closest("pre");
            const codeContent =
                preElement?.querySelector("code")?.innerText || "";
            log(
                "contexts.ChatContext.handleChatboxClick",
                codeContent,
                "Code Content"
            );
            // 3. Use Clipboard API to copy
            navigator.clipboard
                .writeText(codeContent)
                .then(() => {
                    // Optional: Show a toast or feedback to user saying "Copied to clipboard!"
                    alert("Copied to clipboard!");
                    return;
                })
                .catch((err) => {
                    console.error("Failed to copy: ", err);
                });
        }
    }

    async function updateCallback(streamMessages: Message[]) {
        setMessages(streamMessages);
        setLoading(false);
        if (!chatPayload.history_id) {
            const history = await chatClient.create({
                messages: streamMessages,
            });
            log("contexts.ChatContext.updateCallback", history, "Created");
            setChatPayload({
                ...chatPayload,
                query: "",
                history_id: history._id,
            });
        } else {
            const history = await chatClient.update(chatPayload.history_id, {
                messages: streamMessages,
            });
            log("contexts.ChatContext.updateCallback", history, "Updated");
        }
        chatInputRef.current?.focus();
    }

    const sendChatPayload = useCallback(() => {
        if (!chatPayload.query) {
            alert("Please enter a message first.");
            return;
        }
        setLoading(true);
        setChatboxRefIsEmpty(false);

        // Create a copy of the current messages
        const updatedMessages = [...messages];
        updatedMessages.push({ role: "user", content: chatPayload.query });
        const payload = { messages: updatedMessages };

        // Send the payload to the chat client
        chatClient.sendChatStreamMessage(payload, updateCallback, () =>
            setLoading(false)
        );
    }, [apiHost, chatPayload, id, messages, theme, updateCallback]);

    useEffect(() => {
        // 1. Add an event listener on the chatbox
        const chatbox = document.getElementById("chatbox");
        chatbox?.addEventListener("click", handleChatboxClick);

        userInputRef.current?.focus();

        // Cleanup event listener
        return () => {
            chatbox?.removeEventListener("click", handleChatboxClick);
        };
    }, [messages, userInputRef]);

    return (
        <ChatContext.Provider
            value={useMemo(() => {
                return {
                    loading,
                    chatboxRef,
                    chatInputRef,
                    userInputRef,
                    messages,
                    chatPayload,
                    chatboxRefIsEmpty,
                    resetChat,
                    setMessages,
                    setLoading,
                    setChatPayload,
                    sendChatPayload,
                    handleChatboxClick,
                    setChatboxRefIsEmpty,
                };
            }, [
                loading,
                chatboxRef,
                chatInputRef,
                userInputRef,
                messages,
                chatPayload,
                chatboxRefIsEmpty,
                resetChat,
                sendChatPayload,
            ])}
        >
            {children}
        </ChatContext.Provider>
    );
}

export function useChatContext(): any {
    return useContext(ChatContext);
}
