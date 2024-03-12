const primaryColor = "#000";
const secondaryColor = "#6f42c1";
const tertiaryColor = "#ececec";

const boxShadow = "0 2px 4px rgba(0, 0, 0, 0.2)";
const boxShadowChatWindow = "0 4px 10px rgba(0, 0, 0, 0.2)";
const boxShadowChatWindowButton = "0 1px 2px rgba(0, 0, 0, 0.2)";

const logo = "https://dev.promptengineers.ai/192.png";

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
        boxShadow: boxShadow,
        icon: {
            src: logo,
            padding: "8px",
            width: "40px",
            height: "40px",
            borderRadius: "8px",
        },
    },
    chatWindow: {
        title: "Prompt Engineers Bot",
        titleAvatarSrc:
            "https://raw.githubusercontent.com/walkxcode/dashboard-icons/main/svg/google-messages.svg",
        welcomeMessage: "How can I assist you today?",
        welcomeButtons: [
            {
                label: "Website",
                href: "https://promptengineers.ai",
            },
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
            {
                label: "Meetups",
                href: "https://www.meetup.com/plano-prompt-engineers",
            },
        ],
        height: "500px",
        width: "340px",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#ffffff",
        boxShadow: boxShadowChatWindow,
        borderRadius: "8px",
        padding: "10px",
        controlButton: {
            backgroundColor: "#f0f0f0",
            border: "none",
            borderRadius: "20%",
            width: "30px",
            height: "30px",
            hoverColor: "#e0e0e0",
            boxShadow: boxShadowChatWindowButton,
            color: "black",
        },
        icon: {
            src: logo,
            height: "100px",
            width: "100px",
            borderRadius: "10px",
        },
        gridButton: {
            padding: "10px",
            color: "black",
            borderRadius: "2px",
            border: "none",
            backgroundColor: "#f0f0f0",
            hoverColor: "#e0e0e0",
            boxShadow: boxShadowChatWindowButton,
        },
        userMessage: {
            backgroundColor: primaryColor,
            textColor: "#fff",
            showAvatar: true,
            avatarSrc:
                "https://raw.githubusercontent.com/zahidkhawaja/langchain-chat-nextjs/main/public/usericon.png",
        },
        botMessage: {
            backgroundColor: tertiaryColor,
            textColor: "#000",
            showAvatar: true,
            avatarSrc:
                "https://raw.githubusercontent.com/zahidkhawaja/langchain-chat-nextjs/main/public/parroticon.png",
        },
        chatInput: {
            placeholder: "Type your question here...",
            backgroundColor: "#ffffff",
            textColor: "#303235",
            fontSize: "14px",
            spinner: {
                backgroundColor: primaryColor,
                height: "25px",
                width: "25px",
                margin: "0px 4px",
                strokeWidth: "5",
            },
        },
        submitButton: {
            backgroundColor: primaryColor,
            hoverColor: secondaryColor,
            padding: "3px 5px 0px 0px",
        },
    },
};

export default theme;
