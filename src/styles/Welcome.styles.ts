import styled from 'styled-components';
import theme from "../config/theme";
import { ThemeProps } from '../interfaces';

export const WelcomeArea = styled.div`
    text-align: center; // Center the text
    margin-top: auto; // Center vertically
    // margin-bottom: auto;
`;

export const WelcomeHeading = styled.h2<{
    theme?: any;
}>`
    margin: 0;
    padding: 10px;
    color: black;
    font-size: 1.5em;
    font-weight: bold;
    display: block;
    font-family: ${(props) => props.theme?.fontFamily};
`;

export const WelcomeParagraph = styled.p`
    margin: 0;
    padding: 10px;
    color: black;
`;

export const ButtonGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr); // Create a 2x2 grid
    gap: 10px; // Spacing between buttons
    padding: 10px;
    justify-content: center;
    align-items: center;
`;

export const GridButton = styled.button<ThemeProps>`
    padding: 10px;
    color: ${(props) =>
        props.theme?.chatWindow?.gridButton?.color ||
        theme.chatWindow.gridButton.color};
    border-radius: ${(props) =>
        props.theme?.chatWindow?.gridButton?.borderRadius ||
        theme.chatWindow.gridButton.borderRadius};
    border: ${(props) =>
        props.theme?.chatWindow?.gridButton?.border ||
        theme.chatWindow.gridButton.border};
    background-color: ${(props) =>
        props.theme?.chatWindow?.gridButton?.backgroundColor ||
        theme.chatWindow.gridButton.backgroundColor};
    box-shadow: ${(props) =>
        props.theme?.chatWindow?.gridButton?.boxShadow ||
        theme.chatWindow.gridButton.boxShadow};
    cursor: pointer;
    &:hover {
        background-color: ${(props) =>
            props.theme?.chatWindow?.controlButton?.hoverColor ||
            theme.chatWindow.gridButton.hoverColor};
    }
`;

export const StarterButton = styled.button<ThemeProps>`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 10px;
    min-width: max-content; // Ensures the button does not shrink below content width
    color: ${(props) =>
        props.theme?.chatWindow?.gridButton?.color ||
        theme.chatWindow.gridButton.color};
    background-color: ${(props) =>
        props.theme?.chatWindow?.gridButton?.backgroundColor ||
        theme.chatWindow.gridButton.backgroundColor};
    border: ${(props) =>
        props.theme?.chatWindow?.gridButton?.border ||
        theme.chatWindow.gridButton.border};
    box-shadow: ${(props) =>
        props.theme?.chatWindow?.gridButton?.boxShadow ||
        theme.chatWindow.gridButton.boxShadow};
    border-radius: ${(props) =>
        props.theme?.chatWindow?.gridButton?.borderRadius ||
        theme.chatWindow.gridButton.borderRadius};
    cursor: pointer;
    margin: 0 10px 10px 0; // Adjust spacing between buttons
    white-space: normal; // Wrap text normally
    text-align: left; // Align text to the left
    &:hover {
        background-color: ${(props) =>
            props.theme?.chatWindow?.gridButton?.hoverColor ||
            theme.chatWindow.gridButton.hoverColor};
    }
`;

// ... rest of your styled components ...
