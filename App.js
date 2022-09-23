import React, {useEffect, useState} from 'react';
import { Text, View, StyleSheet } from 'react-native';
//import firebase from 'firebase';
import { initializeApp } from "firebase/app";
import LoginForm from "./Components/LoginForm";
import ProfileScreen from "./Components/ProfileScreen";
import { Card } from 'react-native-paper';
import firebase from "firebase/compat";
import SignUpForm from './Components/SignUpForm';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBBTmq8hPwKNVqmLl4fxI7u1XkdDf7k8pk",
  authDomain: "teslabmw-a7c40.firebaseapp.com",
  projectId: "teslabmw-a7c40",
  storageBucket: "teslabmw-a7c40.appspot.com",
  messagingSenderId: "140930604459",
  appId: "1:140930604459:web:652123c5abfce2ac65c6ee"
};

export default function App() {

  //Her oprettes bruger state variblen
    const [user, setUser] = useState({ loggedIn: false });
  const app = initializeApp(firebaseConfig);
    //Koden sikrer at kun én Firebase initieres under brug af appen.
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  
  //onAuthstatechanged er en prædefineret metode, forsynet af firebase, som konstant observerer brugerens status (logget ind vs logget ud)
  //Pba. brugerens status foretages et callback i form af setUSer metoden, som håndterer user-state variablens status.
    function onAuthStateChange(callback) {
      return firebase.auth().onAuthStateChanged(user => {
        if (user) {
          callback({loggedIn: true, user: user});
        } else {
          callback({loggedIn: false});
        }
      });
    }
  
    //Heri aktiverer vi vores listener i form af onAuthStateChanged, så vi dynamisk observerer om brugeren er aktiv eller ej.
    useEffect(() => {
      const unsubscribe = onAuthStateChange(setUser);
      return () => {
        unsubscribe();
      };
    }, []);
  
  //Her oprettes gæstekomponentsindhold, der udgøres af sign-up og login siderne
    const GuestPage = () => {
      return(
          <View style={styles.container}>
            <Text style={styles.paragraph}>
              Opret eller Login med din firebase Email
            </Text>
  
            <Card style={{padding:20}}>
              <SignUpForm />
            </Card>
  
            <Card style={{padding:20}}>
              <LoginForm />
            </Card>
  
          </View>
      )
    }
  
    return user.loggedIn ? <ProfileScreen /> : <GuestPage/> ;
  
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      paddingTop: '5%',
      backgroundColor: 'transparent',
      padding: 20,
    },
    paragraph: {
      margin: 24,
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
    },
  });