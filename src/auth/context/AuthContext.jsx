import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateEmail, updateProfile } from 'firebase/auth';
import React, { useState } from 'react';
import { auth } from '../../firebase-config';

const AuthContext = React.createContext();
export { AuthContext };

const AuthContextProvider = props => {

    const [currentUser, setCurrentUser] = useState(null);

    onAuthStateChanged(auth, user => {
        setCurrentUser(user);
    }, error => {
        console.error(error);
    });

    const signupUserWithEmailAndPassword = async (email, password) => {
        try {
            const user = await createUserWithEmailAndPassword(auth, email, password);
            return user;
        } catch (error) {
            throw error;
        }
    }

    const signinUserWithEmailAndPassword = async (email, password) => {
        try {
            const user = await signInWithEmailAndPassword(auth, email, password);
            return user;
        } catch (error) {
            throw error;
        }
    }

    const signoutUser = async () => {
        try {
            await signOut(auth);
            return;
        } catch (error) {
            throw error;
        }
    }

    const updateCurrentUserName = async (username) => {
        try {
            await updateProfile(auth.currentUser, {displayName: username});
            setCurrentUser({...auth.currentUser});
            return auth.currentUser;
        } catch (error) {
            throw error;
        }
    }

    const updateCurrentUserEmail = async (email, password) => {
        try {
            await signInWithEmailAndPassword(auth, currentUser.email, password);
            await updateEmail(auth.currentUser, email);
            setCurrentUser({...auth.currentUser});
            return auth.currentUser;
        } catch (error) {
            throw error;
        }
    }

    const updateCurrentUserProfilePhoto = async (photoURL) => {
        try {
            await updateProfile(auth.currentUser, {photoURL});
            setCurrentUser({...auth.currentUser});
            console.log('PROFILE PHOTO UPDATED', auth.currentUser);
            return auth.currentUser;
        } catch (error) {
            throw error;
        }
    }

    return(
        <AuthContext.Provider value={{
            currentUser,
            signupUserWithEmailAndPassword,
            signinUserWithEmailAndPassword,
            signoutUser,
            updateCurrentUserName,
            updateCurrentUserEmail,
            updateCurrentUserProfilePhoto
        }}>
            {props.children}
        </AuthContext.Provider>
    );

}
export default AuthContextProvider;