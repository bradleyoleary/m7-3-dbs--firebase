import React, { createContext, useEffect, useState } from 'react';
import withFirebaseAuth from 'react-with-firebase-auth';
import * as firebase from 'firebase';
import 'firebase/auth';

export const AppContext = createContext(null);

// My web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyC53FSTKspC2uPNiqeT5l22s4bGvmHM8yo',
  authDomain: 'user-app-71ec8.firebaseapp.com',
  databaseURL: 'https://user-app-71ec8.firebaseio.com',
  projectId: 'user-app-71ec8',
  storageBucket: 'user-app-71ec8.appspot.com',
  messagingSenderId: '895828076293',
  appId: '1:895828076293:web:3d5801968aaa3b46c6396c',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAppAuth = firebaseApp.auth();

const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

const AppProvider = ({ children, signInWithGoogle, signOut, user }) => {
  const [appUser, setAppUser] = useState({});

  const handleSignOut = () => {
    signOut();
    setAppUser({});
  };

  useEffect(() => {
    if (user) {
      setAppUser({
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      });
    }
  }, [user]);
  return (
    <AppContext.Provider value={{ appUser, signInWithGoogle, handleSignOut }}>
      {children}
    </AppContext.Provider>
  );
};

export default withFirebaseAuth({ providers, firebaseAppAuth })(AppProvider);
