import { useEffect, useState } from 'react';

const useDelayedLoader = (isLoading: boolean) => {
	const [isLoadingDelay, setIsLoadingDelay] = useState(isLoading);

	useEffect(() => {
		let timer: ReturnType<typeof setTimeout>;

		if (isLoading) {
			timer = setTimeout(() => setIsLoadingDelay(true), 300);
		} else {
			setIsLoadingDelay(false);
		}

		return () => clearTimeout(timer);
	}, [isLoading]);

	return isLoadingDelay;
};

export default useDelayedLoader;
