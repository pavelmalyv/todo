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
		(async () => {
			try {
				if (!parseAction?.operation) {
					throw new Error('Invalid action in the URL');
				}

				if (!supportedActions.includes(parseAction.operation)) {
					throw new Error('The action is not supported');
				}

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
