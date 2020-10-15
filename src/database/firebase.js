import app from "firebase/app";
import "firebase/auth";
import "firebase/database";

const config = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

const databaseKeys = {
    DEFAULT: 'default',
    USERS: 'users',
    COLLECTIONS: 'collections',
};

class Firebase {
    constructor() {
        app.initializeApp(config);
        this.auth = app.auth();
        this.database = app.database();
        this.ref = this.database.ref();
    }

    getUid = () => this.auth.currentUser?.uid;

    isAuthenticated = () => this.auth.currentUser !== null;

    createUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    signInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    signOut = () => this.auth.signOut();

    updateProfile = (data) => this.auth.currentUser.updateProfile(data);

    setUserInfo = (uid, username, email) => {
        return this.ref
            .child('users')
            .child(uid)
            .set({
                username: username,
                email: email,
                createdAt: new Date().getTime(),
            });
    }

    addCollection = (name = databaseKeys.DEFAULT) => {
        const uid = this.getUid();
        const key = this.ref.child(databaseKeys.USERS).child(uid).child(databaseKeys.COLLECTIONS).push().key;
        const updates = {};

        updates[`/${databaseKeys.USERS}/${uid}/${databaseKeys.COLLECTIONS}/${key}/`] = name;
        
        if(name === databaseKeys.DEFAULT) {
            updates[`/${databaseKeys.USERS}/${uid}/default/`] = key;
        }

        return this.ref.update(updates);
    }

    addEntry = (data, collection) => {
        const uid = this.getUid();
        return this.ref
            .child(databaseKeys.COLLECTIONS)
            .child(uid)
            .child(collection)
            .push()
            .set(data);
    };

    collections = () => {
        const uid = this.getUid();
        console.log({uid});
        return this.ref.child(databaseKeys.COLLECTIONS).child(uid);
    }

    collectionList = () => {
        const uid = this.getUid();
        return this.ref.child(databaseKeys.USERS).child(uid).child(databaseKeys.COLLECTIONS);
    }
}

export default Firebase;
