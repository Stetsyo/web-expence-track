import { initializeApp } from "firebase/app";
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth"
import {
    doc,
    getDoc,
    setDoc,
    getFirestore,
    collection,
    query,
    where,
    getDocs
} from "firebase/firestore"
const firebaseConfig = {
    apiKey: "AIzaSyBJYEBIYowbkH-MwAdYJJJMKPrR1i7mJh0",
    authDomain: "expence-tracker-e0d27.firebaseapp.com",
    projectId: "expence-tracker-e0d27",
    storageBucket: "expence-tracker-e0d27.appspot.com",
    messagingSenderId: "936009986564",
    appId: "1:936009986564:web:d0fd9fa9acf4879a1b7b51",
    measurementId: "G-F1LBMXRRSF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({prompt: "select_account"});

export const auth = getAuth();
export const firestoreDB = getFirestore(app);

export const userSignOut = async() => {
    return await signOut(auth);
};
export const popUpGoogleSignIn = () => signInWithPopup(auth, googleProvider);
export const createUserDocument = async(userAuth, additionalInf = {}) => {
    const usersRef = collection(firestoreDB, "/users");
    const userDocumentRef = doc(usersRef, userAuth.uid);
    const userSnapshot = await getDoc(userDocumentRef);
    console.log(userSnapshot.exists())

    if (!(await userSnapshot).exists()) {
        try {
            const createdAt = Date.now();
            const {displayName, email} = userAuth;
            await setDoc(userDocumentRef, {
                createdAt,
                displayName,
                email,
                ...additionalInf
            });
        } catch (e) {
            console.log(e.message)
        };
    };
    return userDocumentRef;
};

export const addFirebaseExpense = async(expense) => {
    const expenseCollRef = collection(firestoreDB, "expenses");
    try {
        const newDocRef = await doc(expenseCollRef);
        const newExp = {
            id: newDocRef.id,
            ...expense
        }
        await setDoc(newDocRef, newExp);
        return newExp;
    } catch (e) {
        console.log(e.message)
    }
};
export const getExpenses= async (userId) => {
    const expenseCollRef = collection(firestoreDB, "expenses");
    const q = query(expenseCollRef, where("userId", "==", userId));

    const querySnapshot = await getDocs(q);
    const expensesMap = querySnapshot.docs.reduce((acc, docSnap) => {
        const {date, category, price, userId, id} = docSnap.data();
        acc[id] = { date, category, price, userId, id};
        return acc;
    }, {});
    return expensesMap;
};

export const authByEmailAndPassword = async(password, email) => {
    if (!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password)
};
export const signInByPass = async(password, email) => {
    if (!email || !password) return;
    return await signInWithEmailAndPassword(auth, email, password)
};

