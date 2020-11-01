import firebase from 'firebase'
import React, { createContext, useEffect, useState } from 'react'

const firebaseConfig = {
  apiKey: 'AIzaSyCHo8Ml729QdtUy0PySo8pAf3NeVXRVpqY',
  authDomain: 'serverless-tinder.firebaseapp.com',
  databaseURL: 'https://serverless-tinder.firebaseio.com',
  projectId: 'serverless-tinder',
  storageBucket: 'serverless-tinder.appspot.com',
  messagingSenderId: '560465901911',
  appId: '1:560465901911:web:b7dc4a5a54fcdfd1936612',
  measurementId: 'G-NSNZ9D9E9Y'
}
firebase.initializeApp(firebaseConfig)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

export const uiConfig = {
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    'anonymous'
  ],
  tosUrl: '',
  privacyPolicyUrl: () => { window.location.assign('') },
  callbacks: {
    signInSuccessWithAuthResult: () => false
  }
}

export const UserContext = createContext({ user: null })
UserContext.displayName = 'UserContext'

export const UserProvider = props => {
  const [user, setUser] = useState(null)

  useEffect(() => auth.onAuthStateChanged(async user => {
    if (!user) return setUser(null)
    setUser(user)
    if (user.isAnonymous) return
    const userRef = firestore.doc(`users/${user.uid}`)
    const snapshot = await userRef.get()
    if (!snapshot.exists) {
      const { email, displayName, photoURL, emailVerified, phoneNumber } = user
      try {
        await userRef.set({
          displayName,
          email,
          photoURL,
          emailVerified,
          phoneNumber,
          photos: []
        })
      } catch (error) {
        console.error('Error creating user document', error)
      }
    }
  }), [])

  return (
    <UserContext.Provider value={user}>
      {props.children}
    </UserContext.Provider>
  )
}
