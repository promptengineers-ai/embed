import { StyledSpinner } from "../styles/EmbedChat.styles";
import defaultTheme from "../config/theme";

const Spinner = ({ theme }: { theme: any }) => (
    <StyledSpinner viewBox="0 0 50 50" theme={theme}>
        <circle
            className="path"
            cx="25"
            cy="25"
            r="20"
            fill="none"
            strokeWidth={
                theme?.chatWindow?.chatInput?.spinner.strokeWidth ||
                defaultTheme.chatWindow.chatInput.spinner.strokeWidth
            }
        />
    </StyledSpinner>
);

export default Spinner;