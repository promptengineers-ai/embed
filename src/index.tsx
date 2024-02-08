import { createRoot } from 'react-dom/client';
import EmbedChat from './components/EmbedChat';

declare global {
  interface Window {
    renderEmbedChat: (postion: string) => void;
  }
}

window.renderEmbedChat = (position: string) => {
  // Create a new div to hold the widget
  const widgetContainer = document.createElement('div');
  // Optionally, add a class for styling or leave as is for style via the imported module
  widgetContainer.className = 'widget-container';
  // Append the new div to the body
  document.body.appendChild(widgetContainer);
  
  // Use React 18's createRoot API to render the widget inside the new div
  const root = createRoot(widgetContainer);
  root.render(<EmbedChat position={position} />);
};
