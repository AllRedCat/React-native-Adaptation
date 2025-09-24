import Constants from 'expo-constants';

// Interface para tipagem das variáveis de ambiente
interface AppConfig {
  apiBaseUrl: string;
  apiKey: string;
  firebaseApiKey: string;
  firebaseAuthDomain: string;
  firebaseProjectId: string;
  appEnv: string;
  debugMode: boolean;
  googleMapsApiKey: string;
}

// Acessa as variáveis de ambiente através do Constants.expoConfig.extra
export const config: AppConfig = {
  apiBaseUrl: Constants.expoConfig?.extra?.apiBaseUrl || 'https://api.padrao.com',
  apiKey: Constants.expoConfig?.extra?.apiKey || '',
  firebaseApiKey: Constants.expoConfig?.extra?.firebaseApiKey || '',
  firebaseAuthDomain: Constants.expoConfig?.extra?.firebaseAuthDomain || '',
  firebaseProjectId: Constants.expoConfig?.extra?.firebaseProjectId || '',
  appEnv: Constants.expoConfig?.extra?.appEnv || 'production',
  debugMode: Constants.expoConfig?.extra?.debugMode || false,
  googleMapsApiKey: Constants.expoConfig?.extra?.googleMapsApiKey || '',
};

// Função para verificar se está em modo de desenvolvimento
export const isDevelopment = () => config.appEnv === 'development';

// Função para verificar se o debug está ativado
export const isDebugMode = () => config.debugMode;

// Função para obter a URL completa da API
export const getApiUrl = (endpoint: string) => {
  return `${config.apiBaseUrl}${endpoint}`;
};

// Função para fazer requisições autenticadas
export const getAuthHeaders = () => {
  return {
    'Authorization': `Bearer ${config.apiKey}`,
    'Content-Type': 'application/json',
  };
};
