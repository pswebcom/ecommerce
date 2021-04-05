import firebase from "firebase/app";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDIESThnMpi5j-yrnt46Og6fzGnrSx6bdk",
  authDomain: "ecommerz-4f3f2.firebaseapp.com",
  projectId: "ecommerz-4f3f2",
  messagingSenderId: "446699042433",
  appId: "1:446699042433:web:7642dd5d93569ea56bff80",
};
// initialize firebase app
if (!firebase.apps.length) {
  firebase.initializeApp(config);
}
// export
// export default firebase;
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
