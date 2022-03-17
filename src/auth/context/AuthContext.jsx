import { applyActionCode, confirmPasswordReset, createUserWithEmailAndPassword, deleteUser, onAuthStateChanged, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateEmail, updatePassword, updateProfile } from 'firebase/auth';
import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { auth } from '../../firebase-config';

const AuthContext = createContext();
export { AuthContext };

const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuthContext was used outside of its Provider');
    }
    return context;
};
export { useAuthContext };

const AuthContextProvider = props => {

    const [currentUser, setCurrentUser] = useState(null);

    onAuthStateChanged(auth, user => {
        setCurrentUser(user);
    }, error => {
        console.error(error);
    });

    const signupUserWithEmailAndPassword = useCallback(async (email, password) => {
        try {
            const user = await createUserWithEmailAndPassword(auth, email, password);
            return user;
        } catch (error) {
            throw error;
        }
    }, []);

    const signinUserWithEmailAndPassword = useCallback(async (email, password) => {
        try {
            const user = await signInWithEmailAndPassword(auth, email, password);
            return user;
        } catch (error) {
            throw error;
        }
    }, []);

    const signoutUser = useCallback(async () => {
        try {
            await signOut(auth);
            setCurrentUser(null);
            return;
        } catch (error) {
            throw error;
        }
    }, []);

    const updateCurrentUserName = useCallback(async (username) => {
        try {
            await updateProfile(auth.currentUser, {displayName: username});
            setCurrentUser({...auth.currentUser});
            return auth.currentUser;
        } catch (error) {
            throw error;
        }
    }, []);

    const updateCurrentUserEmail = useCallback(async (email, password) => {
        try {
            await signInWithEmailAndPassword(auth, currentUser.email, password);
            await updateEmail(auth.currentUser, email);
            setCurrentUser({...auth.currentUser});
            return auth.currentUser;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }, [currentUser]);

    const updateCurrentUserProfilePhoto = useCallback(async (photoURL) => {
        try {
            await updateProfile(auth.currentUser, {photoURL});
            setCurrentUser({...auth.currentUser});
            return auth.currentUser;
        } catch (error) {
            throw error;
        }
    }, []);

    const updateCurrentUserPassword = useCallback(async (currentPassword, newPassword) => {
        try {
            await signInWithEmailAndPassword(auth, auth.currentUser.email, currentPassword);
            await updatePassword(auth.currentUser, newPassword);
            setCurrentUser({...auth.currentUser});
            return auth.currentUser;
        } catch (error) {
            throw error;
        }
    }, []);

    const deleteCurrentUserAccount = useCallback(async (password) => {
        try {
            await signInWithEmailAndPassword(auth, auth.currentUser.email, password);
            await deleteUser(auth.currentUser);
            setCurrentUser(null);
            return;
        } catch (error) {
            throw error;
        }
    }, []);

    const sendUserVerificationEmail = useCallback(async () => {
        try {
            await sendEmailVerification(auth.currentUser);
            return;
        } catch (error) {
            throw error;
        }
    }, []);

    const verifyEmail = useCallback(async (actionCode) => {
        try {
            await applyActionCode(auth, actionCode);
            if (!currentUser) {
                throw new Error('No user logged in');
            }
            await auth.currentUser.reload();
            setCurrentUser({...auth.currentUser});
            return auth.currentUser;
        } catch (error) {
            throw error;
        }
    }, [currentUser]);
    
    const sendUserPasswordResetEmail = useCallback(async (email) => {
        try {
            await sendPasswordResetEmail(auth, email);
            return;
        } catch (error) {
            throw error;
        }
    }, []);

    const resetPassword = useCallback(async (actionCode, newPassword) => {
        try {
            await confirmPasswordReset(auth, actionCode, newPassword);
            return;
        } catch (error) {
            throw error;
        }
    }, []);

    const contextValues = useMemo(() => ({
        currentUser,
        signupUserWithEmailAndPassword,
        signinUserWithEmailAndPassword,
        signoutUser,
        updateCurrentUserName,
        updateCurrentUserEmail,
        updateCurrentUserProfilePhoto,
        updateCurrentUserPassword,
        deleteCurrentUserAccount,
        verifyEmail,
        sendUserPasswordResetEmail,
        resetPassword,
        sendUserVerificationEmail
    }), [
        currentUser,
        signupUserWithEmailAndPassword,
        signinUserWithEmailAndPassword,
        signoutUser,
        updateCurrentUserName,
        updateCurrentUserEmail,
        updateCurrentUserProfilePhoto,
        updateCurrentUserPassword,
        deleteCurrentUserAccount,
        verifyEmail,
        sendUserPasswordResetEmail,
        resetPassword,
        sendUserVerificationEmail
    ]);

    return(
        <AuthContext.Provider value={contextValues}>
            {props.children}
        </AuthContext.Provider>
    );

}
export default AuthContextProvider;