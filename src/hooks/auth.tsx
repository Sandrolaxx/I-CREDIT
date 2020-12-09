/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-use-before-define
import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';

import AsyncStorage from '@react-native-community/async-storage';

import api from '../services/api';

  interface User {
    id: number;
    name: string;
    email: string;
    document: string;
  }

  interface AuthState {
    user: User;
  }

  interface SignInCredentials {
    login: string;
    password: string;
  }

  interface AuthContextData {
    user: User;
    loading: boolean;
    signIn(credentials: SignInCredentials): Promise<void>;
    updateUser(user: User): Promise<void>;
    signOut(): void;
  }

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const [user] = await AsyncStorage.multiGet([
        '@IsCredit:user',
      ]);

      if (user[1]) {
        setData({ user: JSON.parse(user[1]) });
      }

      setLoading(false);
    }

    loadStorageData();
  }, []);

  const signIn = useCallback(async ({ login, password }) => {
    const reseponse = await api.post('/auth/login', { login, password });

    const {
      document, email, id, name,
    } = reseponse.data;

    const userRetunr = {
      document,
      email,
      id,
      name,
    };

    const user = userRetunr;

    await AsyncStorage.multiSet([
      ['@IsCredit:user', JSON.stringify(user)],
    ]);

    setData({ user });
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(['@IsCredit:user']);

    setData({} as AuthState);
  }, []);

  const updateUser = useCallback(
    async (user: User) => {
      await AsyncStorage.setItem('@IsCredit:user', JSON.stringify(user));

      setData({
        user,
      });
    },
    [setData],
  );

  return (
      <AuthContext.Provider
        value={{
          user: data.user, loading, signIn, signOut, updateUser,
        }}
      >
        {children}
      </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth precisa ser utilizado com o AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
