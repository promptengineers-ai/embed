export type Message = {
    role: string;
    content: string;
    actions?: any[];
    documents?: any[];
    images?: any[];
};

export type ChatContextType = {
    loading: boolean;
    setLoading: (loading: boolean) => void;
    chatboxRef: React.MutableRefObject<HTMLInputElement | null>;
    chatInputRef: React.MutableRefObject<HTMLInputElement | null>;
    userInputRef: React.MutableRefObject<HTMLInputElement | null>;
    messages: Message[];
    setMessages: (messages: Message[]) => void;
    sendChatPayload: () => void;
    chatPayload: { query: string; history_id: string };
    setChatPayload: (payload: any) => void;
    handleChatboxClick: (e: MouseEvent) => void;
    chatboxRefIsEmpty: boolean;
    setChatboxRefIsEmpty: (isEmpty: boolean) => void;
    resetChat: () => void;
};

export type Welcome = {
    heading: string;
    paragraph: string;
    buttons: { label: string; href: string }[];
};
