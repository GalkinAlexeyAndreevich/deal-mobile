import { initializeApp } from "firebase/app";
import { initializeFirestore, persistentLocalCache } from '@firebase/firestore';
import {
  getReactNativePersistence,
  initializeAuth,
} from "@firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from 'expo-constants';
const firebaseConfig = {
  apiKey: Constants.expoConfig ?.extra?.firebaseApiKey,
  authDomain: Constants.expoConfig ?.extra?.firebaseAuthDomain,
  projectId: Constants.expoConfig ?.extra?.firebaseProjectId,
  storageBucket: Constants.expoConfig ?.extra?.firebaseStorageBucket,
  messagingSenderId: Constants.expoConfig ?.extra?.firebaseMessagingSenderId,
  appId: Constants.expoConfig ?.extra?.firebaseAppId,
  measurementId: Constants.expoConfig ?.extra?.firebaseMeasurementId
};

let app;
if (!app) {
    app = initializeApp(firebaseConfig);
}

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// persistentLocalCache is required to enable offline querying
const db = initializeFirestore(app, {
  experimentalForceLongPolling: !false,
  localCache: persistentLocalCache(/*settings*/ {}),
});

export { db, auth };