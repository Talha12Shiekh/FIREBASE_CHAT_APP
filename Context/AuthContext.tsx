import React, {createContext, useContext, useEffect, useState} from 'react';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

interface AuthContextProps {
  children: React.ReactNode;
}

interface PromiseSuccessResponse {
  success: boolean;
  data?: FirebaseAuthTypes.User | null;
}
interface PromiseRejectResponse {
  success: boolean;
  message?: string;
}

// tkshk123@gmail.com
// tkshk123

//! PENDING IMAGE PICKER FIX IN SIGN UP SCREEN AND ALSO SHOW LOADING IMAGE WHEN THE USER PICKED THE IMAGE

type PromiseResponse = PromiseSuccessResponse | PromiseRejectResponse;

interface ContextProviderProps {
  user: FirebaseAuthTypes.User | null;
  userAuthenticated: boolean;
  login: (email: string, password: string) => Promise<PromiseResponse>;
  logout: () => Promise<PromiseResponse>;
  forgotpassword: (email: string) => Promise<PromiseResponse>;
  register: (email: string, password: string) => Promise<PromiseResponse>;
  setuserimageandname: React.Dispatch<
    React.SetStateAction<{
      name: string;
      image: string;
    }>
  >;
  updateProfile: () => void;
}

export const AuthContext = createContext<ContextProviderProps | null>(null);

export const AuthContextProvider = ({children}: AuthContextProps) => {
  const [user, setuser] = useState<FirebaseAuthTypes.User | null>(null);
  const [userAuthenticated, setuserAuthenticated] = useState(false);
  const [userimageandname, setuserimageandname] = useState({
    name: '',
    image: '',
  });

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(usr => {
      if (usr) {
        setuser(usr);
        setuserAuthenticated(true);
      } else {
        setuser(null);
        setuserAuthenticated(false);
      }
    });

    return unsubscribe;
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await auth().signInWithEmailAndPassword(email, password);

      return {success: true, data: response?.user};
    } catch (error) {
      console.log(error);
      if (!(error instanceof Error)) return {success: false};
      let message = error.message;
      if (message.includes('auth/invalid-credential'))
        message = 'Invalid Credentials!';
      else message = 'An unexpected error occurred. Please try again.';
      return {
        success: false,
        message,
      };
    }
  };

  const logout = async () => {
    try {
      await auth().signOut();

      return {
        success: true,
      };
    } catch (error) {
      if (!(error instanceof Error)) return {success: false};
      let message = error.message;
      return {
        success: false,
        message,
      };
    }
  };

  const register = async (email: string, password: string) => {
    try {
      const response = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );

      const {name, image} = userimageandname;

      await firestore().collection('Users').add({
        username: name,
        userimage: image,
        userId: response?.user.uid,
      });

      return {success: true, data: response?.user};
    } catch (error) {
      if (!(error instanceof Error)) return {success: false};
      let message = error.message;

      if (message.includes('auth/email-already-in-use'))
        message = 'Email is already in use';
      else if (message.includes('auth/invalid-email'))
        message = 'Invalid Email!';
      else if (message.includes('auth/weak-password'))
        message = 'The password is weak.';
      else message = 'An unexpected error occurred. Please try again.';

      return {
        success: false,
        message,
      };
    }
  };

  const forgotpassword = async (email: string) => {
    try {
      await auth().sendPasswordResetEmail(email);

      return {success: true};
    } catch (error) {
      if (!(error instanceof Error)) return {success: false};
      let message = error.message;
      return {
        success: false,
        message,
      };
    }
  };

  const updateProfile = async () => {
    const user = auth().currentUser;
    const {name, image} = userimageandname;

    if (user) {
      // checking first that the user exists or not because the updateProfile function will not work if the user does not exists
      try {
        await user.updateProfile({
          displayName: name,
          photoURL: image,
        });

        const updateduser = auth().currentUser;
        setuser(updateduser); // updating the local user again

        setuserimageandname(p => ({...p, image: ''}));
      } catch (error) {
        console.log('ProfileErrorAgin ', error);
      }
    }
  };

  const contextreturnvalue: ContextProviderProps = {
    user,
    userAuthenticated,
    login,
    logout,
    register,
    forgotpassword,
    setuserimageandname,
    updateProfile,
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
