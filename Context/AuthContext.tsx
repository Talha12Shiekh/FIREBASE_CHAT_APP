import {createContext, useContext, useEffect, useState} from 'react';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
interface AuthContextProps {
  children: React.ReactNode;
}

interface ContextProviderProps {
  user: FirebaseAuthTypes.User | null;
  userAuthenticated: boolean;
  login: (email: string, password: number) => Promise<void>;
  logout: (email: string, password: number) => Promise<void>;
  register: (
    email: string,
    password: number,
    username: string,
    profileURL: string,
  ) => Promise<void>;
}
export const AuthContext = createContext<ContextProviderProps | null>(null);

export const AuthContextProvider = ({children}: AuthContextProps) => {
  const [user, setuser] = useState<FirebaseAuthTypes.User | null>(null);
  const [userAuthenticated, setuserAuthenticated] = useState(false);

  useEffect(() => {
    auth().onAuthStateChanged(usr => {
      if (usr) {
        setuserAuthenticated(true);
        setuser(usr);
      } else {
        setuserAuthenticated(false);
        setuser(null);
      }
    });
  }, []);

  const login = async (email: string, password: number) => {
    try {
      // pending
    } catch (error) {}
  };

  const logout = async (email: string, password: number) => {
    try {
      // pending
    } catch (error) {}
  };

  const register = async (
    email: string,
    password: number,
    username: string,
    profileURL: string,
  ) => {
    try {
      // pending
    } catch (error) {}
  };

  const contextreturnvalue: ContextProviderProps = {
    user,
    userAuthenticated,
    login,
    logout,
    register,
  };

  return (
    <AuthContext.Provider value={contextreturnvalue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const value = useContext(AuthContext);

  if (!value) {
    throw new Error('Component must be wrapped inside a provider !');
  }
  return value;
};
