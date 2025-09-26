// context/AuthContext.tsx
import { router } from 'expo-router';
import React, { createContext, ReactNode, useEffect, useReducer } from 'react';

// Tipos
export interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, telephone: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
  checkAuth: () => Promise<void>;
}

// Actions
type AuthAction = 
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'CLEAR_ERROR' }
  | { type: 'LOGOUT' };

// Reducer
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_USER':
      return { ...state, user: action.payload, loading: false, error: null };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    case 'LOGOUT':
      return { ...state, user: null, loading: false, error: null };
    default:
      return state;
  }
};

// Estado inicial
const initialState: AuthState = {
  user: null,
  loading: true,
  error: null,
};

// Context
export const AuthContext = createContext<AuthContextType | null>(null);

// Provider
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Verificar autenticação ao iniciar o app
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      const response = await fetch('https://api.vagaslivre.com/app/users/me', {
        method: 'GET',
        credentials: 'include', // Inclui cookies automaticamente
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        dispatch({ type: 'SET_USER', payload: data.user });
        router.replace('/(protected)/home');
      } else {
        // Não autenticado ou sessão expirada
        dispatch({ type: 'SET_USER', payload: null });
      }
    } catch (error) {
      console.error('Erro ao verificar autenticação:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Erro ao verificar autenticação' });
      dispatch({ type: 'SET_USER', payload: null });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const login = async (email: string, password: string) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'CLEAR_ERROR' });

      const response = await fetch('https://api.vagaslivre.com/app/users/login', {
        method: 'POST',
        credentials: 'include', // Inclui e salva cookies automaticamente
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Cookie já foi salvo automaticamente pelo navegador/fetch
        dispatch({ type: 'SET_USER', payload: data.user });
        
        // Redirecionar para área protegida
        router.replace('/(protected)/home');
      } else {
        dispatch({ type: 'SET_ERROR', payload: data.message || 'Erro ao fazer login' });
      }
    } catch (error) {
      console.error('Erro no login:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Erro de conexão. Tente novamente.' });
    }
  };

  const register = async (name: string, telephone: string, email: string, password: string) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'CLEAR_ERROR' });

      const response = await fetch('https://api.vagaslivre.com/app/users', {
        method: 'POST',
        credentials: 'include', // Inclui e salva cookies automaticamente
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Cookie já foi salvo automaticamente
        dispatch({ type: 'SET_USER', payload: data.user });
        
        // Redirecionar para área protegida
        router.replace('/(protected)/home');
      } else {
        dispatch({ type: 'SET_ERROR', payload: data.message || 'Erro ao criar conta' });
      }
    } catch (error) {
      console.error('Erro no registro:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Erro de conexão. Tente novamente.' });
    }
  };

  const logout = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // Fazer logout no servidor (vai limpar o cookie)
      const res = await fetch('https://api.vagaslivre.com/app/users/logout', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Limpar estado local
      dispatch({ type: 'LOGOUT' });
      
      // Redirecionar para login
      router.replace('/(auth)/login');
    } catch (error) {
      console.error('Erro no logout:', error);
      // Mesmo com erro, limpar estado local
      dispatch({ type: 'LOGOUT' });
      router.replace('/(auth)/login');
    }
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const contextValue: AuthContextType = {
    user: state.user,
    loading: state.loading,
    error: state.error,
    login,
    register,
    logout,
    clearError,
    checkAuth,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Utilitário para fazer requisições autenticadas
export const authenticatedFetch = async (url: string, options: RequestInit = {}) => {
  return fetch(url, {
    ...options,
    credentials: 'include', // Sempre incluir cookies
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
};
