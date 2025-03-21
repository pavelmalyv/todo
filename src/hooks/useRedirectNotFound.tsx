import { useEffect } from 'react';
import { useNavigate } from 'react-router';

const useRedirectNotFound = (isRedirect: boolean, to: string) => {
	const navigate = useNavigate();

	useEffect(() => {
		if (!isRedirect) {
			return;
		}

		navigate(to);
	}, [isRedirect, to, navigate]);
};

export default useRedirectNotFound;
