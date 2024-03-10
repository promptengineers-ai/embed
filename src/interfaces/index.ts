import { Welcome } from "../types";

export interface IContextProvider {
    children: React.ReactNode;
}

export interface ThemeProps {
    theme?: any;
}

export interface BotConfig {
    id: string;
    apiHost?: string;
    theme?: any;
    welcome?: Welcome;
}