import styled from 'styled-components';

export const WelcomeArea = styled.div`
    text-align: center; // Center the text
    margin-top: auto; // Center vertically
    // margin-bottom: auto;
`;

export const WelcomeHeading = styled.h2`
    margin: 0;
    padding: 10px;
    // Add any additional styles for the heading
`;

export const WelcomeParagraph = styled.p`
    margin: 0;
    padding: 10px;
    // Add any additional styles for the paragraph
`;

export const ButtonGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr); // Create a 2x2 grid
    gap: 10px; // Spacing between buttons
    padding: 10px;
    justify-content: center;
    align-items: center;
`;

export const GridButton = styled.button`
    padding: 10px;
    border-radius: 4px;
    border: 1px solid #ccc;
    background-color: #f9f9f9;
    cursor: pointer;
    &:hover {
        background-color: #e9e9e9;
    }
`;

// ... rest of your styled components ...
