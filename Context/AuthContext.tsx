import React, {createContext, useContext, useEffect, useState} from 'react';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {WEB_CLIENT_ID} from '../Constants';

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

//! PENDING IMAGE PICKER FIX IN SIGN UP SCREEN AND ALSO SHOW LOADING IMAGE WHEN THE USER PICKED THE IMAGE

type PromiseResponse = PromiseSuccessResponse | PromiseRejectResponse;

interface ContextProviderProps {
  user: FirebaseAuthTypes.User | null;
  userAuthenticated: boolean;
  login: (email: string, password: string) => Promise<PromiseResponse>;
  logout: () => Promise<PromiseResponse>;
  forgotpassword: (email: string) => Promise<PromiseResponse>;
  register: (
    email: string,
    password: string,
    name: string,
  ) => Promise<PromiseResponse>;
  setimageofuser: React.Dispatch<React.SetStateAction<string>>;
  setuser: React.Dispatch<React.SetStateAction<FirebaseAuthTypes.User | null>>;
  updateUser: (updatedata: {
    displayName?: string;
    photoURL?: string;
  }) => Promise<void>;
  handleUpdateUserInFirebase: (
    loggeduser: FirebaseAuthTypes.User | null,
    updateObject: {userimage?: string; username?: string},
  ) => Promise<void>;
  handleGoggleSignin: () => Promise<void>;
}

export const AuthContext = createContext<ContextProviderProps | null>(null);

export const AuthContextProvider = ({children}: AuthContextProps) => {
  const [user, setuser] = useState<FirebaseAuthTypes.User | null>(null);
  const [userAuthenticated, setuserAuthenticated] = useState(false);
  const [imageofuser, setimageofuser] = useState('');

  GoogleSignin.configure({
    webClientId: WEB_CLIENT_ID,
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

  const register = async (email: string, password: string, name: string) => {
    try {
      const response = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );

      await firestore().collection('Users').add({
        username: name,
        userimage: imageofuser,
        userId: response?.user.uid,
      });

      setimageofuser('');

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

  async function updateUser(updatedata: {
    displayName?: string;
    photoURL?: string;
  }) {
    const loggeduser = auth().currentUser;

    if (loggeduser) {
      await loggeduser.updateProfile(updatedata);
      await loggeduser.reload();

      const updateduser = auth().currentUser;
      setuser(updateduser);
    }
  }

  async function handleUpdateUserInFirebase(
    loggeduser: FirebaseAuthTypes.User | null,
    updateObject: {userimage?: string; username?: string},
  ) {
    try {
      const querysnapshot = await firestore()
        .collection('Users')
        .where('userId', '==', loggeduser?.uid)
        .get();

      if (!querysnapshot.empty) {
        console.log('hello again');
        const userDoc = querysnapshot.docs[0];

        await firestore()
          .collection('Users')
          .doc(userDoc.id)
          .update(updateObject);
      }

      // setimguploaded(false);
    } catch (error) {
      // setimguploaded(false);
      console.log(error);
    }
  }

  const handleGoggleSignin = async () => {
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});

      await GoogleSignin.signIn();

      const getToken = await GoogleSignin.getTokens();

      const googleCredential = auth.GoogleAuthProvider.credential(
        getToken.idToken,
      );

      let user = await auth().signInWithCredential(googleCredential);

      console.log(user);
    } catch (error) {
      const firebaseerror = error as FirebaseAuthTypes.NativeFirebaseAuthError;
      if (firebaseerror.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User cancelled the sign-in.');
      } else if (firebaseerror.code === statusCodes.IN_PROGRESS) {
        console.log('Sign-in is in progress.');
      } else if (
        firebaseerror.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE
      ) {
        console.log('Play Services not available.');
      } else {
        console.log('Unknown Error:', firebaseerror);
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
    setimageofuser,
    setuser,
    updateUser,
    handleUpdateUserInFirebase,
    handleGoggleSignin,
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
