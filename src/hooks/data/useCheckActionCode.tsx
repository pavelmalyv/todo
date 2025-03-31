import { auth } from '@/firebase';
import { normalizeError } from '@/utils/error';
import { checkActionCode, parseActionCodeURL } from 'firebase/auth';
import { useEffect, useState } from 'react';

const useCheckActionCode = (supportedActions: string[]) => {
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<Error | undefined>(undefined);
	const [validCode, setValidCode] = useState<string | null>(null);
	const parseAction = parseActionCodeURL(window.location.href);

	useEffect(() => {
		if (!parseAction?.operation) {
			const error = new Error('Invalid action in the URL');

			setError(error);
			console.error(error);

			return;
		}

		if (!supportedActions.includes(parseAction.operation)) {
			const error = new Error('The action is not supported');

			setError(new Error('The action is not supported'));
			console.error(error);

			return;
		}

		(async () => {
			try {
				setIsLoading(true);

				await checkActionCode(auth, parseAction.code);
				setValidCode(parseAction.code);
			} catch (error) {
				setError(normalizeError(error));
				console.error(error);
			} finally {
				setIsLoading(false);
			}
		})();
	}, [parseAction?.operation, parseAction?.code, supportedActions]);

	return [validCode, parseAction?.operation ?? null, isLoading, error] as const;
};

export default useCheckActionCode;
