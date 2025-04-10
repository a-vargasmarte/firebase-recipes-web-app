import {useState} from 'react';
import FirebaseAuthService from './FirebaseAuthService';
import LoginForm from './components/LoginForm';
import './App.css';

//eslint-disable-next-line no-unused-vars
import firebase from './FirebaseConfig';

function App() {
  const [user, setUser] = useState(null);

  FirebaseAuthService.subscribeToAuthChanges(setUser);
  return (
    <div className="App">
      <header className="App-header">
        <h1>Firebase Recipes</h1>
      </header>
      <LoginForm existingUser={user} />
    </div>
  );
}

export default App;
