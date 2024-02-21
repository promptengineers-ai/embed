import { createRoot } from 'react-dom/client';
import Embeddable from './components/Embeddable';
import { log } from './utils/log';
import { Welcome } from './types';

declare global {
	interface Window {
		renderEmbedChat: (
            botId: string, 
            apiHost?: string, 
            styles?: any,
            welcome?: Welcome
        ) => void;
	}
}

window.renderEmbedChat = (
    botId: string, 
    apiHost?: string, 
    styles?: any,
    welcome?: Welcome
) => {
    log("index.window.renderEmbedChat", botId, 'Bot ID:');
    // Create a new div to hold the widget
    const widgetContainer = document.createElement('div');
    // Optionally, add a class for styling or leave as is for style via the imported module
    widgetContainer.className = 'widget-container';
    // Append the new div to the body
    document.body.appendChild(widgetContainer);
    
    // Use React 18's createRoot API to render the widget inside the new div
    const root = createRoot(widgetContainer);
    root.render(
        <Embeddable 
            apiHost={apiHost} 
            botId={botId} 
            styles={styles}
            welcome={welcome}
        />
    );
};
