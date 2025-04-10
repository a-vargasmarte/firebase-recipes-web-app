import firebase from "./FirebaseConfig";
import {getAuth, createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, signOut, sendPasswordResetEmail,
    GoogleAuthProvider, signInWithPopup
} from 'firebase/auth';

const auth = getAuth(firebase);

const registerUser = (auth, email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
};

const loginUser = (auth, email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
};

const logoutUser = (auth) => {
    return signOut(auth);
};

const PasswordResetEmail = (auth, email) => {
    return sendPasswordResetEmail(auth, email);
};

const loginWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
};

const subscribeToAuthChanges = (handleAuthChange) => {
    auth.onAuthStateChanged((user) => {
        handleAuthChange(user);
    });
};

const FirebaseAuthService = {
    registerUser,
    loginUser,
    logoutUser,
    PasswordResetEmail,
    loginWithGoogle,
    subscribeToAuthChanges
}

export default FirebaseAuthService;