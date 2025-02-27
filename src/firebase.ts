import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyDZgN1UJe6A8hzBTsldzWzw1_-66gn8iJQ',
	authDomain: 'todo-60a12.firebaseapp.com',
	projectId: 'todo-60a12',
	storageBucket: 'todo-60a12.firebasestorage.app',
	messagingSenderId: '284483277024',
	appId: '1:284483277024:web:0990458bc810b970900085',
};

initializeApp(firebaseConfig);

export const auth = getAuth();
