const theme = {
    button: {
        backgroundColor: "#000",
        hoverColor: "#6f42c1",
        padding: "2px",
        borderRadius: "8px",
        iconColor: "white",
        height: "40px",
        width: "40px",
        bottom: "20px",
        position: "right",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
        icon: {
            padding: "8px",
            height: "40px",
            src: "https://dev.promptengineers.ai/favicon.ico",
        },
    },
    chatWindow: {
        showTitle: true, // show/hide the title bar
        title: "Prompt Engineers Bot",
        titleAvatarSrc:
            "https://raw.githubusercontent.com/walkxcode/dashboard-icons/main/svg/google-messages.svg",
        welcomeMessage: "How can I assist you today?",
        welcomeButtons: [
            {
                label: "Slack Channel",
                href: "https://promptengineersai.slack.com/join/shared_invite/zt-21upjsftv-gX~gNjTCU~2HfbeM_ZwTEQ#/shared-invite/email",
            },
            {
                label: "Documentation",
                href: "https://prompt-engineers.gitbook.io/documentation",
            },
            {
                label: "Github",
                href: "https://github.com/promptengineers-ai",
            },
            {
                label: "Youtube",
                href: "https://www.youtube.com/@promptengineersai",
            },
        ],
        backgroundColor: "#ffffff",
        height: 700,
        width: 400,
        fontSize: 16,
        poweredByTextColor: "#303235",
        botMessage: {
            backgroundColor: "#f7f8ff",
            textColor: "#303235",
            showAvatar: true,
            avatarSrc:
                "https://raw.githubusercontent.com/zahidkhawaja/langchain-chat-nextjs/main/public/parroticon.png",
        },
        userMessage: {
            backgroundColor: "#3B81F6",
            textColor: "#ffffff",
            showAvatar: true,
            avatarSrc:
                "https://raw.githubusercontent.com/zahidkhawaja/langchain-chat-nextjs/main/public/usericon.png",
        },
        textInput: {
            placeholder: "Type your question",
            backgroundColor: "#ffffff",
            textColor: "#303235",
            sendButtonColor: "#3B81F6",
        },
    },
};

export default theme;
