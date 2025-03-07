import { tasksCollectionRef } from '@/firebase';
import { doc, setDoc } from 'firebase/firestore';

export const setTaskDoc = async (
	userId: string,
	taskId: string,
	value?: { done: boolean },
	options?: { merge: true },
) => {
	const merge = options?.merge ?? true;

	await setDoc(doc(tasksCollectionRef(userId), taskId), value, {
		merge,
	});
};
