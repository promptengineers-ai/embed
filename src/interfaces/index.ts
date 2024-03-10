import { Welcome } from "../types";

export interface IContextProvider {
    children: React.ReactNode;
}

export interface StyledButtonProps {
    hoverColor?: string;
    position?: string;
    theme?: any;
}

export interface BotConfig {
    id: string;
    apiHost?: string;
    theme?: any;
    welcome?: Welcome;
}