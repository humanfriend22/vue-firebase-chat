import * as functions from "firebase-functions";
import * as firebase from 'firebase-admin';
const Filter = require('bad-words');

firebase.initializeApp();

const db = firebase.firestore();
const banned = db.collection('banned');
const filter = new Filter();

export const detectProfaneUsers = functions.firestore
    .document('messages/{docID}')
    .onCreate(async (change: firebase.firestore.QueryDocumentSnapshot) => {
        const { text, uid } = change.data();

        if (filter.isProfane(text)) {
            return Promise.all([
                banned.doc(uid).set({}),
                change.ref.update({
                    text: `🤐 I got banned for saying... ${filter.clean(text)}`
                })
            ]);
        }

        return true;
    });