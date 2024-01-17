import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, doc, getDoc, updateDoc, deleteDoc, onSnapshot } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { ref, onUnmounted } from "vue";
import { createUserWithEmailAndPassword as createUserWithEmailAndPasswordFirebase, 
         signInWithEmailAndPassword as signInWithEmailAndPasswordFirebase, 
         getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyACkm-wt0JzKiO4C_xbDJBfTHopHo2RX30",
  authDomain: "better-jiujitsu.firebaseapp.com",
  projectId: "better-jiujitsu",
  storageBucket: "better-jiujitsu.appspot.com",
  messagingSenderId: "466343675997",
  appId: "1:466343675997:web:648639c5e4cef2b57e25b4",
  measurementId: "G-0890R9N9RG"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const analytics = getAnalytics(app);
const db = getFirestore(app);
const userCollection = collection(db, 'users');

export const createUserWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPasswordFirebase(auth, email, password);
    const user = userCredential.user;
    return user;
  } catch (error) {
    console.error('Registration error:', error.message);
    throw error;
  }
};

export const createUser = async (user) => {
  return await addDoc(userCollection, user);
}

export const getUser = async (id) => {
  console.log('Fetching user with ID:', id);

  try {
    const userDoc = await getDoc(doc(userCollection, id));

    if (userDoc.exists()) {
      const userData = userDoc.data();
      console.log('User data:', userData);
      return userData;
    } else {
      console.log('User not found.');
      return null;
    }
  } catch (error) {
    console.error('Error fetching user data:', error.message);
    throw error;
  }
}



export const updateUser = async (id, user) => {
  const userDocRef = doc(userCollection, id);
  return await updateDoc(userDocRef, user);
}

export const deleteUser = async (id) => {
  const userDocRef = doc(userCollection, id);
  return await deleteDoc(userDocRef);
}

export const useLoadUsers = () => {
  const users = ref([]);
  const unsubscribe = onSnapshot(userCollection, (snapshot) => {
    users.value = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  });
  onUnmounted(unsubscribe);
  return users;
}

export const signInWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPasswordFirebase(auth, email, password);
    const user = userCredential.user;
    return user;
  } catch (error) {
    console.error('Sign-in error:', error.message);
    throw error;
  }
};

export const getCurrentUser = () => {
  return auth.currentUser;
};
