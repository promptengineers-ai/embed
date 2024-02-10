import { createContext, useContext } from 'react';

export type ConfigType = {
  api: {
      SERVER_URL: string;
  };
} | null;

export const ConfigContext = createContext<ConfigType>(null);

export function useConfig() {
  const context = useContext(ConfigContext);
  if (!context) {
      throw new Error('Configuration is not available. Ensure you are using the useConfig hook within the ConfigProvider tree.');
  }
  return context;
}