// Styled button component
import styled from 'styled-components';
import { FiSend, FiSettings } from 'react-icons/fi';
import { FaUndo } from "react-icons/fa";
import { SiOpenai } from "react-icons/si";
import { AiOutlineClose } from "react-icons/ai";

interface StyledButtonProps {
    hoverColor?: string;
    position: string;
}

export const MainButton = styled.div<StyledButtonProps>`
    position: fixed;
    bottom: 20px;
    ${props => props.position || 'right'}: 20px;
    background-color: #007bff;
    color: white;
    display: flex; // Use flexbox to center content
    align-items: center; // Center vertically
    justify-content: center; // Center horizontally
    padding: 10px;
    border-radius: 8px;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    transition: background-color 0.3s;
    font-family: sans-serif;
    width: 30
    px; // Set a fixed width
    height: 30
    px; // Set a fixed height to form a circle

    &:hover {
        background-color: ${props => props.hoverColor || '#6f42c1'};
    }
`;

export const ChatWindow = styled.div`
    position: fixed;
    bottom: 75px; /* Adjust based on your button's size and desired location */
    right: 20px; /* Or 'left: 20px;' depending on your 'position' prop */
    width: 350px; /* Or any other size */
    height: 500px; /* Or any other size */
    background-color: white;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    border-radius: 8px;
    padding: 10px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    justify-content: space-between;
    font-family: sans-serif;
`;

export const ChatContent = styled.div`
    flex-grow: 1;
    overflow-y: auto;
    overflow-x: hidden;
    display: flex;
    flex-direction: column-reverse;
    height: 100%;

    &::-webkit-scrollbar {
        display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
`;

export const InputArea = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
    overflow: hidden;
    background: white;
`;

export const ChatInput = styled.textarea`
    flex-grow: 1;
    padding: 8px 10px;
    border: none;
    border-radius: 4px;
    resize: none;
    font-family: sans-serif;
    color: black;
    &:focus {
        outline: none;
    }
    margin: 0;
    &::-webkit-scrollbar {
        display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
    overflow: hidden;
    &:focus {
        overflow-y: auto;
    }
`;

export const SubmitButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    color: #007bff;
    display: flex;
    align-items: center; // Align the icon inside the button
    justify-content: center; // Center the icon horizontally
    padding: 0 8px; // Adjust padding as needed
    &:hover {
        color: #0056b3;
    }
    &:focus {
        outline: none;
    }
`;

export const ControlButtons = styled.div`
    display: flex;
    justify-content: right; // Align buttons to the left
    gap: 10px; // Spacing between buttons
    margin-bottom: 10px; // Space between buttons and chat content
`;

export const ControlButton = styled.button`
    background-color: #f0f0f0;
    border: none;
    border-radius: 50%;
    width: 25px; // Small button size
    height: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 1px 2px rgba(0,0,0,0.2);
    transition: background-color 0.3s;
    color: black;

    &:hover {
        background-color: #e0e0e0;
    }
`;

export const MessageContent = styled.div`
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow-x: auto; // Scroll horizontally only if needed
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; // IE and Edge
  scrollbar-width: none; // Firefox
`;

// Add some simple styling for messages
export const Message = styled.div<{ sender: 'user' | 'bot' }>`
    background-color: ${props => props.sender === 'user' ? '#007bff' : '#ECECEC'};
    color: ${props => props.sender === 'user' ? 'white' : 'black'};
    border-radius: 7px;
    padding: 5px 10px;
    margin-bottom: 10px;
    align-self: ${props => props.sender === 'user' ? 'flex-start' : 'flex-end'};
    max-width: 85%;
`;

export const iconStyle = `
  font-size: 1.5em; // Adjust as needed
  line-height: 1; // Reset line-height to remove any extra space
`;
export const FiSendIcon = styled(FiSend)`${iconStyle}`;
export const SiOpenaiIcon = styled(SiOpenai)`${iconStyle}`;
export const AiOutlineCloseIcon = styled(AiOutlineClose)`${iconStyle}`;
export const ClearIcon = styled(FaUndo)``; // Replace FiTrash with the actual icon you use for clear
export const SettingsIcon = styled(FiSettings)``; // Replace FiSettings with the actual icon you use for settings
