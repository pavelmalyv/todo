import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyCJh6q_buDIAZpFLdvKujnV25qi1KWnGIM',
	authDomain: 'todo-25f8d.firebaseapp.com',
	projectId: 'todo-25f8d',
	storageBucket: 'todo-25f8d.firebasestorage.app',
	messagingSenderId: '487510959419',
	appId: '1:487510959419:web:b21799cf7a5b9981a7031e',
};

initializeApp(firebaseConfig);

export const auth = getAuth();
