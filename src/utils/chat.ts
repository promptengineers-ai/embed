import marked from '../config/marked';

export const getLastUserIndex = (messages: {role: string, content: string}[]): number => {
  for (let i = messages.length - 1; i >= 0; i--) {
    if (messages[i].role === 'user') {
      // Return the index if the object property "role" is equal to "user"
      return i;
    }
  }
  // Return -1 if no object property "role" is equal to "user"
  return -1;
};

export function constructDeleteMessageButton() {
  let deleteButton = document.createElement('button');
	let icon = document.createElement('i');
	icon.className = 'fas fa-undo';
	deleteButton.appendChild(icon);
	deleteButton.className = 'delete-btn';
  return deleteButton;
}

export function constructUserMessageDiv(messages: { role: string, content: string }[]) {
  let userMessageDiv = document.createElement('div');
  userMessageDiv.className = 'message user';
  userMessageDiv.style.backgroundColor = 'rgb(0, 123, 255)';
  userMessageDiv.style.borderRadius = '5px';
  userMessageDiv.style.color = 'white';
  userMessageDiv.style.padding = '5px 10px';
  userMessageDiv.style.fontSize = '14px';
  userMessageDiv.style.marginBottom = '10px';

  // Create and add the "👨‍💻 You:" message title
  let messageTitle = document.createElement('p');
  messageTitle.innerHTML = '👨‍💻 You:';
  messageTitle.style.color = 'white';
  messageTitle.style.fontSize = '18px';
  userMessageDiv.appendChild(messageTitle);

  // Create a separate <p> for the parsed message content and append it to userMessageDiv
  let messageContent = document.createElement('p');
  messageContent.innerHTML = marked.parse(messages[getLastUserIndex(messages)].content);
  userMessageDiv.appendChild(messageContent);

  return userMessageDiv;
}

export function constructAssistantMessageDiv() {
  let assistantMessageDiv = document.createElement('div');
  assistantMessageDiv.className = 'message assistant';
  assistantMessageDiv.style.backgroundColor = 'rgb(236, 236, 236)';
  assistantMessageDiv.style.color = 'black';
  assistantMessageDiv.style.borderRadius = '5px';
  assistantMessageDiv.style.padding = '5px 10px';
  assistantMessageDiv.style.fontSize = '14px';
  assistantMessageDiv.style.marginBottom = '10px';

  // Create a container for the top row which will hold the title and toolContainer
  let topRowDiv = document.createElement('div');
  topRowDiv.style.display = 'flex';
  topRowDiv.style.alignItems = 'center';
  topRowDiv.style.justifyContent = 'space-between';
  assistantMessageDiv.appendChild(topRowDiv);

  // Create and add the "🤖 Assistant:" message title
  let messageTitle = document.createElement('p');
  messageTitle.innerHTML = '🤖 Assistant:';
  messageTitle.style.color = 'black';
  messageTitle.style.fontSize = '18px';
  messageTitle.style.margin = '0'; // Remove default margin
  topRowDiv.appendChild(messageTitle);

  // Create a container for the tool messages similar to #state-container
  let toolContainer = document.createElement('div');
  toolContainer.id = 'tool-container';  // Ensure unique ID or class if needed
  toolContainer.style.border = '1px solid #A0AEC0';
  toolContainer.style.color = '#A0AEC0';
  toolContainer.style.padding = '2px 5px';
  toolContainer.style.width = '200px';
  toolContainer.style.borderRadius = '5px';
  toolContainer.style.position = 'relative';
  assistantMessageDiv.appendChild(toolContainer);

  // Append toolContainer to the top row
  topRowDiv.appendChild(toolContainer);

  // Create a separate <p> for the message content and append it to assistantMessageDiv
  let messageContent = document.createElement('p');
  assistantMessageDiv.appendChild(messageContent);

  // Create a div for displaying the current state (similar to #state-display)
  let stateDisplay = document.createElement('div');
  stateDisplay.id = 'state-display';
  stateDisplay.textContent = 'Waiting for action...';  // Example text
  toolContainer.appendChild(stateDisplay);

  // Create a dropdown arrow (similar to #dropdown-arrow)
  let dropdownArrow = document.createElement('div');
  dropdownArrow.id = 'dropdown-arrow';
  dropdownArrow.style.cursor = 'pointer';
  dropdownArrow.style.position = 'absolute';
  dropdownArrow.style.right = '5px';
  dropdownArrow.style.top = '2px';
  dropdownArrow.textContent = '▼';
  toolContainer.appendChild(dropdownArrow);

  // Create the log section (similar to #log)
  let log = document.createElement('div');
  log.id = 'log';
  log.style.display = 'none';
  log.style.borderTop = '1px solid #ddd';
  log.style.maxHeight = '200px';
  log.style.overflowY = 'auto';
  toolContainer.appendChild(log);

  // Event listener for the dropdown arrow
  dropdownArrow.addEventListener('click', function() {
    if (log.style.display === 'none') {
      log.style.display = 'block';
    } else {
      log.style.display = 'none';
    }
  });

  let spinner = constructSpinner();
  spinner.style.display = 'none'; // hide the spinner initially
  assistantMessageDiv.appendChild(spinner); 

  return { assistantMessageDiv, spinner };
}

export function constructAssistantRetrievalMessageDiv() {
  let assistantMessageDiv = document.createElement('div');
  assistantMessageDiv.className = 'message assistant';
  
  // Create a container for the top row which will hold the title and toolContainer
  let topRowDiv = document.createElement('div');
  // topRowDiv.style.display = 'flex';
  // topRowDiv.style.alignItems = 'center';
  // topRowDiv.style.justifyContent = 'space-between';
  assistantMessageDiv.appendChild(topRowDiv);

  // Create and add the "🤖 Assistant:" message title
  let messageTitle = document.createElement('p');
  messageTitle.innerHTML = '🤖 Assistant:';
  messageTitle.style.color = '#a0aec0';
  messageTitle.style.fontSize = '18px';
  messageTitle.style.margin = '0px 10px 0px 0px'; // Remove default margin
  topRowDiv.appendChild(messageTitle);

  let docsContainer = document.createElement('div');
  docsContainer.id = 'docs-container'; // Ensure unique ID or class if needed
  docsContainer.style.display = 'flex';
  docsContainer.style.overflowX = 'auto';
  docsContainer.style.whiteSpace = 'nowrap';
  docsContainer.style.marginTop = '10px'; // Spacing from the previous elements
  docsContainer.style.position = 'relative';
  docsContainer.style.overflowY = 'hidden'; // Hide vertical scrollbar

  topRowDiv.appendChild(docsContainer);

  // Create a separate <p> for the message content and append it to assistantMessageDiv
  let messageContent = document.createElement('div');
  assistantMessageDiv.appendChild(messageContent);

  let spinner = constructSpinner();
  spinner.style.display = 'none'; // hide the spinner initially
  assistantMessageDiv.appendChild(spinner); 

  return { assistantMessageDiv, spinner };
}

export function constructSpinner() {
  let spinnerContainer = document.createElement('div');
  spinnerContainer.className = 'spinner-container'; // Use this class to style the container
  spinnerContainer.style.display = 'flex';
  spinnerContainer.style.alignItems = 'center';

  let spinner = document.createElement('div');
  spinner.className = 'spinner';
  spinnerContainer.appendChild(spinner); // Add spinner to the container

  let processingText = document.createElement('span');
  processingText.className = 'processing-text'; // Use this class to style the text
  processingText.textContent = 'Processing...';
  spinnerContainer.appendChild(processingText); // Add text to the container

  return spinnerContainer; // Return the container with spinner and text
}


export function readStreamResponse(
  response: any,
  messages: {role: string, content: string}[],
  chatbox: HTMLDivElement,
  assistantMessageDiv: HTMLElement, // Now it's passed as a parameter
  spinner: HTMLElement, // Now it's passed as a parameter
  cb: (streamMessages: {role: string, content: string}[]) => void
) {
  let reader = response.body?.getReader();
  let decoder = new TextDecoder();
  let accumulator = "";
  let assistantMessage = "";

  reader?.read().then(function processMessage(
    {done, value}: {done: boolean, value: Uint8Array}
  ): Promise<void> {
    if (done) {
      console.log('Stream complete', messages)
      cb(messages);
      spinner.remove(); // remove spinner when stream is complete
      return Promise.resolve();  // return a resolved Promise
    }

    // Once the first chunk of data is received or the stream is complete
    if (spinner) {
      spinner.style.display = 'none'; // Hide the spinner
    }

    // add the new data to the accumulator
    accumulator += decoder.decode(value);

    // while there are complete messages in the accumulator, process them
    let newlineIndex;
    while ((newlineIndex = accumulator.indexOf("\n\n")) >= 0) {
      let message = accumulator.slice(0, newlineIndex);
      accumulator = accumulator.slice(newlineIndex + 2);

      if (message.startsWith("data: ")) {
        message = message.slice(6);
      }

      // append the message to the DOM
      console.log(JSON.parse(message));

      if (JSON.parse(message).type === "tool") {
        let toolMessage = JSON.parse(message).message;

        // Find the state display in the current assistantMessageDiv
        let stateDisplay = assistantMessageDiv.querySelector('#state-display');
        if (stateDisplay) {
          stateDisplay.textContent = `Action(s): ${toolMessage}`;
        }
      }

      if (JSON.parse(message).type === "log") {
        let logMessage = JSON.parse(message).message;

        // Find the log div in the current assistantMessageDiv
        let logDiv = assistantMessageDiv.querySelector('#log');
        if (logDiv) {
          let logEntry = document.createElement('p');
          logEntry.textContent = JSON.stringify(logMessage);
          logDiv.appendChild(logEntry);
        }
      }

      if (JSON.parse(message).type === "doc") {
        let docMessage = JSON.parse(message).message;
        let sourceURL = docMessage.metadata?.source?.replace('rtdocs/', 'http://');

        // Find the docs container in the current assistantMessageDiv
        let docsContainer = assistantMessageDiv.querySelector('#docs-container');
        if (docsContainer) {
          // Create a link for each doc message
          let docLink = document.createElement('a');
          docLink.style.display = 'inline-block';
          docLink.style.border = '1px solid #A0AEC0';
          docLink.style.marginRight = '10px'; // Spacing between doc links
          docLink.style.padding = '2px';
          docLink.style.fontSize = '12px';
          docLink.style.borderRadius = '5px';
          docLink.style.cursor = 'pointer';

          // Create a tooltip for the link
          let tooltip = document.createElement('span');
          
          // Create an anchor tag instead of a button
          let tooltipLink = document.createElement('a');
          tooltipLink.style.display = 'block'; // Ensure it appears on its own line, adjust style as needed
          tooltipLink.style.margin = '5px 0'; // Add some margin around the link for spacing
          tooltipLink.textContent = 'View Document'; // Text for the link
          tooltipLink.href = sourceURL; // Set the href to the document URL
          tooltipLink.target = '_blank'; // Ensure it opens in a new tab
          tooltipLink.style.textDecoration = 'underline'; // Optional: Style as a link
          // Add more styles to tooltipLink as needed

          // Append the button to the tooltip before setting its innerHTML with the content
          tooltip.appendChild(tooltipLink);
          tooltip.innerHTML += marked.parse(docMessage.page_content);
          
          // Tooltip styles
          tooltip.style.visibility = 'hidden';
          tooltip.style.position = 'absolute';
          tooltip.style.backgroundColor = '#000';
          tooltip.style.color = '#fff';
          tooltip.style.padding = '5px';
          tooltip.style.borderRadius = '5px';
          tooltip.style.zIndex = '1';
          tooltip.style.whiteSpace = 'normal';
          tooltip.style.maxWidth = '300px';
          tooltip.style.fontSize = '12px'; // Enable vertical scrolling within the tooltip
          tooltip.style.overflowY = 'auto'; // Enable vertical scrolling within the tooltip
          tooltip.style.maxHeight = '200px'; // Limit the tooltip's height
          tooltip.style.marginTop = '15px'; // Wrap the tooltip text

          // Show the tooltip on hover
          docLink.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent the click from propagating to the document
        
            // Toggle visibility
            if (tooltip.style.visibility === 'visible') {
                tooltip.style.visibility = 'hidden';
            } else {
                // Positioning the tooltip
                const linkRect = this.getBoundingClientRect();
                tooltip.style.left = `${linkRect.left + window.scrollX}px`;
                tooltip.style.top = `${linkRect.bottom + window.scrollY + 10}px`;
        
                // Append to body and show
                document.body.appendChild(tooltip);
                tooltip.style.visibility = 'visible';
            }
          });

          // Hide the tooltip on mouseout
          document.addEventListener('click', function(e) {
            const target = e.target as HTMLElement;
            if (tooltip.style.visibility === 'visible' && !tooltip.contains(target)) {
                tooltip.style.visibility = 'hidden';
                // Optionally remove the tooltip from the body to clean up
                document.body.removeChild(tooltip);
            }
          })

          // Append the tooltip to the link
          docLink.appendChild(tooltip);

          // Parse and set the doc message content
          let docContent = document.createElement('p');
          let title = docMessage.metadata?.title || docMessage.page_content.slice(0, 20);
          docContent.textContent = title;
          docContent.style.maxWidth = '200px'; // Set a max width for each doc link
          docContent.style.overflow = 'hidden'; // Hide overflowed content
          docContent.style.textOverflow = 'ellipsis'; // Add ellipsis for overflowed content
          docLink.appendChild(docContent);

          // Append the doc link to the docs container
          docsContainer.appendChild(docLink);
        }
      }

      // Push to response chunks
      if (JSON.parse(message).type === "stream") {
        let parsed = JSON.parse(message).message;
        assistantMessage += parsed;
      }

      if (JSON.parse(message).type === "end") {
        messages.push({
          role: "assistant",
          content: assistantMessage
        });
        assistantMessage = ""; // reset the assistant message for the next response
      } else {
        assistantMessageDiv.children[1].innerHTML = marked.parse(assistantMessage);
      }

      // add the assistant message to the chatbox
      chatbox.appendChild(assistantMessageDiv);

      // scroll to the bottom every time a new message is added
      chatbox.scrollTop = chatbox.scrollHeight;
    }

    // continue reading from the stream
    return (reader?.read().then(processMessage)) ?? Promise.resolve();
  })
}

export const filterChatHistory = (list: any[], type?: string) => {
  // If no type is provided, return the entire list
  if (!type) {
    return list;
  }

  let filteredList = [];

  switch (type) {
    case 'agent':
      filteredList = list.filter((item) => item.tools.length > 0);
      break;
    case 'vectorstore':
      filteredList = list.filter((item) => item.vectorstore);
      break;
    default:
      filteredList = list.filter((item) => (item.tools.length === 0 && !item.vectorstore));
      break;
  }

  return filteredList;
};