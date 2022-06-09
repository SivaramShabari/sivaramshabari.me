import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
	apiKey: "AIzaSyAp5DAmiRKJeR_WG8uPyoHDBUKTDrVdWmg",
	authDomain: "sivaram-shabari.firebaseapp.com",
	projectId: "sivaram-shabari",
	storageBucket: "sivaram-shabari.appspot.com",
	messagingSenderId: "267297580776",
	appId: "1:267297580776:web:4d7d664e6d8de038ee8b5d",
	measurementId: "G-WPJ7SQTE7R",
};
const app = initializeApp(firebaseConfig);

export { app };
