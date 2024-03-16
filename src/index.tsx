import { createRoot } from "react-dom/client";
import Embeddable from "./components/Embeddable";
import { BotConfig } from "./interfaces";
import { log } from "./utils/log";
import ChatProvider from "./contexts/ChatContext";

declare global {
    interface Window {
        Bot: (config: BotConfig) => void;
    }
}

window.Bot = (config: BotConfig) => {

    log("index.window.Bot", config.id, "Bot ID:");

    // Create a new div to hold the widget
    const widgetContainer = document.createElement("div");
    widgetContainer.className = "widget-container"; // Optionally, add a class for styling
    document.body.appendChild(widgetContainer); // Append the new div to the body

    // Use React 18's createRoot API to render the widget inside the new div
    const root = createRoot(widgetContainer);
    root.render(
        <ChatProvider id={config.id} apiHost={config.apiHost} theme={config.theme}>
            <Embeddable {...config} />
        </ChatProvider>
    );
};
