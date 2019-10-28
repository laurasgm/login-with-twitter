import React from 'react';
import './App.css';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import {Map, InfoWindow, Marker, GoogleApiWrapper,Polyline,Listing} from 'google-maps-react';

/*
var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: 'X6q1LDtjhSMijIg1R31ZPWkKK',
  consumer_secret: '22tGllKSZJswOebFKvHEa8Vz2lBr8WOHHg6lWC0Rj6NUgtO6sh',
  bearer_token: 'AAAAAAAAAAAAAAAAAAAAAKxsAQEAAAAA1Bx6JsxK50EfT14B2LGdgOJhEsI%3DJVwEKw36TZPxgKaAs968cyfugoXCxCA10knnhE3WtIV5syCuyy'
});
 
*/

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
    //this.geoTwitter();
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
        user => { this.setState({isSignedIn: !!user})
        
        //console.log("user", user)
        });
  }
  
  // Make sure we un-register Firebase observers when the component unmounts.
  componentWillUnmount() {
    this.unregisterAuthObserver();
    
  }
/*
  geoTwitter= () => {
    client.get('favorites/list', function(error, tweets, response) {
      if(error) throw error;
      console.log(tweets);  // The favorites.
      console.log(response);  // Raw response object.
    });
  }*/

  
  
  render(){
    let positions= [{lat: 4.790638, lng: -75.690119}]

    var position = positions.map((obj) =>
        <Marker
        onClick={this.onMarkerClick}
        name={'Current location'}
        position={obj.lat, obj.lng} />
    );

    return (
      <div className="App">
        {this.state.isSignedIn ? (
          <span>
          <h1>Inicio de sesion exitoso!</h1>
          <p>Bienvenido(a) {firebase.auth().currentUser.displayName}! has iniciado sesion!</p>
          <img
            alt="Foto de Perfil" 
            src={firebase.auth().currentUser.photoURL}/>
          <button onClick={() => firebase.auth().signOut()}>Sign-out</button> 
          <Map
            google={this.props.google}
            zoom={15}
            onClick={this.onMapClicked}
            initialCenter={{
              lat: 4.790638, 
              lng: -75.690119
            }}
            >
            <Marker
            onClick={this.onMarkerClick}
            name={'Current location'}
            position={{ lat: 4.790638, lng: -75.690119}} />
      
          {position}
             
          </Map>
          </span>
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

export default GoogleApiWrapper({
  apiKey: ("AIzaSyC6bv3AJPKD3B76dqPZlXKlU4Fy3NFaMMk")
})(App)
