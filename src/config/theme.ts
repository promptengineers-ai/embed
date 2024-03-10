const primaryColor = "#000";
const secondaryColor = "#6f42c1";
const tertiaryColor = "#ececec";

const theme = {
    button: {
        backgroundColor: primaryColor,
        hoverColor: secondaryColor,
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
                label: "Github",
                href: "https://github.com/promptengineers-ai",
            },
            {
                label: "Documentation",
                href: "https://prompt-engineers.gitbook.io/documentation",
            },
            {
                label: "Youtube",
                href: "https://www.youtube.com/@promptengineersai",
            },
        ],
        height: "500px",
        width: "340px",
        backgroundColor: "#ffffff",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
        borderRadius: "8px",
        padding: "10px",
        botMessage: {
            backgroundColor: tertiaryColor,
            textColor: "#000",
            showAvatar: true,
            avatarSrc:
                "https://raw.githubusercontent.com/zahidkhawaja/langchain-chat-nextjs/main/public/parroticon.png",
        },
        userMessage: {
            backgroundColor: primaryColor,
            textColor: "#fff",
            showAvatar: true,
            avatarSrc:
                "https://raw.githubusercontent.com/zahidkhawaja/langchain-chat-nextjs/main/public/usericon.png",
        },
        chatInput: {
            placeholder: "Type your question here...",
            backgroundColor: "#ffffff",
            textColor: "#303235",
            fontSize: "14px",
        },
        submitButton: {
            backgroundColor: primaryColor,
            hoverColor: secondaryColor,
            padding: "3px 5px 0px 0px",
        },
    },
};

export default theme;
