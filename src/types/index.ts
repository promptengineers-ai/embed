export type ChatContextType = {
    loading: boolean;
    setLoading: (loading: boolean) => void;
    chatboxRef: React.MutableRefObject<HTMLInputElement | null>;
    userInputRef: React.MutableRefObject<HTMLInputElement | null>;
    messages: { role: string; content: string }[];
    setMessages: (messages: { role: string; content: string }[]) => void;
    sendChatPayload: () => void;
    chatPayload: {
        systemMessage: string;
        query: string;
        temperature: number;
        model: string;
        vectorstore: string;
        functions: string[];
    };
    setChatPayload: (payload: any) => void;
    handleChatboxClick: (e: MouseEvent) => void;
    chatboxRefIsEmpty: boolean;
    setChatboxRefIsEmpty: (isEmpty: boolean) => void;
    resetChat: () => void;
};

export type Welcome = {
    heading: string,
    paragraph: string,
    buttons: {label: string, href: string}[]
}