// Styled button component
import styled from 'styled-components';
import { FiSend } from 'react-icons/fi';
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
    padding: 20px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-family: sans-serif;
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
    &:focus {
        outline: none;
    }
    margin: 0;
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

export const iconStyle = `
  font-size: 1.5em; // Adjust as needed
  line-height: 1; // Reset line-height to remove any extra space
`;
export const FiSendIcon = styled(FiSend)`${iconStyle}`;
export const SiOpenaiIcon = styled(SiOpenai)`${iconStyle}`;
export const AiOutlineCloseIcon = styled(AiOutlineClose)`${iconStyle}`;