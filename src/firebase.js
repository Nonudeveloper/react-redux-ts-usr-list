import * as firebase from 'firebase';
import firestore from 'firebase/firestore'

const settings = {timestampsInSnapshots: true};

const config = {
  apiKey: "AIzaSyCQMmuFee217bAVz9nbK5j1HSdnMV_mPXI",
  authDomain: "https://test-b0f47.firebaseio.com",
  databaseURL: "https://test-b0f47.firebaseio.com",
  projectId: "test-b0f47",
  storageBucket: "test-b0f47.appspot.com"
};
firebase.initializeApp(config);

firebase.firestore().settings(settings);

export default firebase;