import { 
  constructUserMessageDiv, 
  constructAssistantMessageDiv,
  readStreamResponse,
} from './chat';

/**----------------------------------------------------------
 * Send a message to the server and get a response
 * ----------------------------------------------------------
 * @returns 
 */
export class ChatClient {
	private controller: AbortController | null = null;

	// Method to abort the ongoing request
	public abortRequest() {
		if (this.controller) {
		  this.controller.abort();
		}
	}

	public async sendChatStreamMessage(
        payload: {
            model: string,
            temperature: number,
            messages: {role: string, content: string}[],
        },
        cb: (streamMessages: {role: string, content: string}[]) => void,
        onError: () => void
    ) {
		// Abort any ongoing requests
		if (this.controller) {
			this.controller.abort();
		}

		this.controller = new AbortController();

        // Add the user's message to the messages array
        let userMessageDiv = constructUserMessageDiv(payload.messages);

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

        fetch(`http://localhost:8000/api/v1/chat`, {
			method: 'POST',
			headers: {
				'x-api-key': '',
				'Content-Type': 'application/json',
			},
			signal: this.controller.signal,
			body: JSON.stringify({
				stream: true,
				messages: payload.messages,
				model: payload.model,
				temperature: payload.temperature,
			}),
		})
		.then(response => {
			console.log('Server Response:', response);

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
                console.log('Server Response:', response);
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
				console.log('Request aborted by user');
				return;
			} else {
				console.error('Fetch error:', error);
			}
		});
    }
}