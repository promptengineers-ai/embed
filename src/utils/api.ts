import { 
  constructUserMessageDiv, 
  constructAssistantMessageDiv,
  readStreamResponse,
} from './chat';
import { log } from '../utils/log';

/**----------------------------------------------------------
 * Send a message to the server and get a response
 * ----------------------------------------------------------
 * @returns 
 */
export class ChatClient {
	private controller: AbortController | null = null;
	private apiUrl: string;
	private botId: string | undefined;
	private messageStyles: string | undefined;

	constructor(_apiUrl?: string, _botId?: string, _styles?: any) {
		this.apiUrl	= _apiUrl || 'https://api.promptengineers.ai';
		this.botId = _botId;
		this.messageStyles = _styles;
	}

	// Method to abort the ongoing request
	public abortRequest() {
		if (this.controller) {
		  this.controller.abort();
		}
	}

	public async sendChatStreamMessage(
		botId: string,
        payload: {messages: {role: string, content: string}[]},
        cb: (streamMessages: {role: string, content: string}[]) => void,
        onError: () => void
    ) {
		// Abort any ongoing requests
		if (this.controller) {
			this.controller.abort();
		}

		this.controller = new AbortController();

        // Add the user's message to the messages array
        let userMessageDiv = constructUserMessageDiv(payload.messages, this.messageStyles);

        // Add the message div to the chatbox
        let chatbox = document.getElementById('chatbox') as HTMLDivElement;
        chatbox.appendChild(userMessageDiv);
		chatbox.scrollTop = chatbox.scrollHeight;

        // Construct the assistant message div (with spinner) right after user message is added
        let { assistantMessageDiv, spinner } = constructAssistantMessageDiv();

        // Make the spinner visible
        spinner.style.display = 'flex';

        // Add the assistant message (with the spinner) to the chatbox
        chatbox.appendChild(assistantMessageDiv);
        chatbox.scrollTop = chatbox.scrollHeight

        fetch(`${this.apiUrl}/api/v1/bots/${this.botId || botId}/chat`, {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			signal: this.controller.signal,
			body: JSON.stringify({
				stream: true,
				messages: payload.messages,
			}),
		})
		.then(response => {
			if (!response.ok) {
                // Handle HTTP errors
                response.json().then(errorData => {
                    // Assuming the server sends a JSON response with an error message
                    alert(errorData.detail);
                    spinner.remove();
                    onError();
                    return;
                });
            } else {
                // Handle successful response
                log('utils.api.ChatClient.sendChatStreamMessage', response);
                readStreamResponse(
					response, 
					payload.messages, 
					chatbox, 
					assistantMessageDiv, 
					spinner, 
					cb
				);
            }
		})
		.catch(error => {
			if (error.name === 'AbortError') {
				log('utils.api.ChatClient.sendChatStreamMessage', 'Request aborted by user');
				return;
			} else {
				console.error('Fetch error:', error);
			}
		});
    }
}