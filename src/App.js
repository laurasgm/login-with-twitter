import React from 'react';
import './App.css';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';


firebase.initializeApp({
  apiKey: "AIzaSyCvSgLDKC8A-iIKoRH3fyVC49bqvkR2ZgU",
  authDomain: "loginwithsocial-e6771.firebaseapp.com"
})

class App extends React.Component {
  // The component's Local state.
  state = {
    isSignedIn: false // Local signed-in state.
  };
 
  // Configure FirebaseUI.
  uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // We will display Google and Twitter as auth providers.
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => false
    }
  };

  // Listen to the Firebase Auth state and set the local state.
  componentDidMount= () => {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
        user => { this.setState({isSignedIn: !!user})
        console.log("user", user)
        });
  }
  
  // Make sure we un-register Firebase observers when the component unmounts.
  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  render(){
  return (
    <div className="App">
      {this.state.isSignedIn ? (
        <span>
        <h1>Inicio de sesion exitoso!</h1>
        <p>Bienvenido(a) {firebase.auth().currentUser.displayName}! has iniciado sesion!</p>
        <img
          alt="Foto de Perfil" 
          src={firebase.auth().currentUser.photoURL}/>
        <button onClick={() => firebase.auth().signOut()}>Sign-out</button> </span>
      ):(
        <StyledFirebaseAuth
            uiConfig={this.uiConfig}
            firebaseAuth={firebase.auth()}
          />
      )}
    </div>
  )
}
}
export default App;
