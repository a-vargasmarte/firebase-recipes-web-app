import { useState } from "react";
import FirebaseAuthService from "../FirebaseAuthService";
import {getAuth} from "firebase/auth"

const LoginForm = ({existingUser}) => {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const auth = getAuth();

    async function handleSubmit(event){
        event.preventDefault();
        try {
            await FirebaseAuthService.loginUser(auth, username, password);
            setUserName("");
            setPassword("");            
        } catch (err) {
            alert(err.message);
        }
    }

    function handleLogout() {
        FirebaseAuthService.logoutUser(auth);
    }

    async function handleSendResetPasswordEmail() {
        if (!username) {
            alert('Missing username');
            return;
        }

        try {
            await FirebaseAuthService.PasswordResetEmail(auth, username);
            alert("Sent the password reset email");
        } catch(error) {
            alert(error.message);
        }
    }

    // async function handleLoginWithGoogle() {
    //     try {
    //         await FirebaseAuthService.loginWithGoogle();
    //         alert("Sent the password reset email");
    //     } catch(error) {
    //         alert(error.message);
    //     }
    // }

    return <div className="login-form-container">
        {
            existingUser? 
            <div className="row">
                <h3>Welcome, {existingUser.email}</h3>
                <button type="button" className="primary-button" onClick={handleLogout}>Logout</button>

            </div>:
            <form onSubmit={handleSubmit} className="login-form">
                <label className="input-label login-label">
                    Username (email):
                    <input
                        type="email"
                        required
                        value={username}
                        onChange={(e) => setUserName(e.target.value)}
                        className="input-text"
                     />
                </label>
                <label className="input-label login-label">
                    Password:
                    <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="input-text"
                     />
                </label>
                <div className="button-box">
                    <button className="primary-button">Login</button>
                    <button type="button" onClick={handleSendResetPasswordEmail} className="primary-button">Reset Password</button>
                    {/* <button type="button" className="primary-button" onClick={handleLoginWithGoogle}>Login with Google</button> */}
                </div>
            </form>
        }
        </div>;

}

export default LoginForm;