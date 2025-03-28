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
			setError(new Error('Invalid action in the URL'));
			return;
		}

		if (!supportedActions.includes(parseAction.operation)) {
			setError(new Error('The action is not supported'));
			return;
		}

		(async () => {
			try {
				setIsLoading(true);

				await checkActionCode(auth, parseAction.code);
				setValidCode(parseAction.code);
			} catch (error) {
				setError(normalizeError(error));
			} finally {
				setIsLoading(false);
			}
		})();
	}, [parseAction?.operation, parseAction?.code, supportedActions]);

	return [validCode, parseAction?.operation ?? null, isLoading, error] as const;
};

export default useCheckActionCode;
