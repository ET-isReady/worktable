// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getStorage, getStream } from 'firebase/storage'
import { ref as storageRef } from 'firebase/storage'
import firebase from 'firebase/compat/app'
import 'firebase/compat/storage'


const firebaseConfig = {
 apiKey: "AIzaSyAIoV3EmiPrf1cMhRpq247hXHImZ3QulwY",
 authDomain: "threads-8081f.firebaseapp.com",
 databaseURL: "https://threads-8081f-default-rtdb.firebaseio.com",
 projectId: "threads-8081f",
 storageBucket: "threads-8081f.appspot.com",
 messagingSenderId: "207150880599",
 appId: "1:207150880599:web:e3074042e77985fcce1012"
}


const app = initializeApp(firebaseConfig)


if(!firebase.apps.length){
 firebase.initializeApp(firebaseConfig)
}


export const storage = getStorage(app)
export { storageRef }
export { firebase }