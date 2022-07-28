// Import Vue Hooks
import { ref, computed, onUnmounted } from 'vue';
import type { Ref, ComputedRef } from 'vue';

// Firebase Imports
import FirebaseConfig from './firebase.config';
import { initializeApp, FirebaseError } from 'firebase/app';
import {
    getFirestore,
    collection,
    onSnapshot,
    FieldValue,
    serverTimestamp,
    addDoc,
    orderBy,
    query,
    limit,
    connectFirestoreEmulator
} from 'firebase/firestore';
import {
    getAuth,
    onAuthStateChanged,
    signOut,
    GoogleAuthProvider,
    signInWithPopup,
    connectAuthEmulator
} from 'firebase/auth';

// Initialize Firebase App
initializeApp(FirebaseConfig);

// References
const auth = getAuth();
const db = getFirestore();
const messages = collection(db, 'messages');

// Emulators in Development Mode
if (process.env.NODE_ENV === 'development') {
    const host = new URL(window.location.href).hostname;
    try {
        connectAuthEmulator(auth, `http://${host}:9099`, { disableWarnings: true });
        connectFirestoreEmulator(db, host, 8080);
    } catch (e) {
        console.error('Failed connecting to Firebase Emulators: \n' + e);
    }
}

// Update Auth State
onAuthStateChanged(auth, user => {
    isLoggedInMutable.value = !!user;
    uidMutable.value = user?.uid;
});

// Internal
type Message = {
    text: string,
    photoURL: string,
    createdAt: FieldValue,
    uid: string
}

type CreateMessageResponse = ('success' | 'user-error' | 'user-banned' | 'unknown-error');

// Reactive Data
const isLoggedInMutable = ref(!!auth.currentUser);
const uidMutable = ref(auth.currentUser?.uid);
const isBannedMutable: Ref<boolean> = ref(false);

// Computed Exports
export const isLoggedIn = computed(() => isLoggedInMutable.value);
export const uid = computed(() => uidMutable.value);
export const isBanned = computed(() => isBannedMutable.value);

// Exported Functions
export const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const { user } = await signInWithPopup(auth, provider);
};

export const logout = () => signOut(auth);

export const createMessage = async (text: string): Promise<CreateMessageResponse> => {
    if ((text.trim() !== '') && auth.currentUser) {
        const { uid, photoURL } = auth.currentUser;
        try {
            await addDoc(messages, {
                text: text.trim(),
                photoURL: photoURL || 'https://placeimg.com/48/48/people',
                createdAt: serverTimestamp(),
                uid,
            });

            return 'success';
        } catch (err) {
            if (err instanceof FirebaseError) {
                isBannedMutable.value = true;
                return 'user-banned';
            }
            return 'unknown-error';
        }
    }
    return 'user-error';
};

export const getMessagesStream = (): ComputedRef<Message[]> => {
    const messagesRef: Ref<Message[]> = ref([]);

    // Choose how many messages can be displayed at a time here:
    const messagesQuery = query(messages, orderBy('createdAt', 'desc'), limit(25));
    const closeStream = onSnapshot(messagesQuery, ({ docs }) => {
        // @ts-ignore
        messagesRef.value = docs.map(doc => doc.data());
    });

    onUnmounted(closeStream);

    return (computed(() => messagesRef.value.reverse()));
};