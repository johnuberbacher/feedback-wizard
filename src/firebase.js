import { initializeApp } from 'firebase/app'
import { collection, getFirestore } from 'firebase/firestore'
// ... other firebase imports

export const firebaseApp = initializeApp({
  // your application settings
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
})

// used for the firestore refs
const db = getFirestore(firebaseApp)

// here we can export reusable database references
export const todosRef = collection(db, 'surveys')