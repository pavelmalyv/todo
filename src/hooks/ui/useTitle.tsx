import { useEffect } from 'react';
import { SITE_NAME } from '@/consts/config';

export const useTitle = (page?: string) => {
	useEffect(() => {
		const title = page ? `${SITE_NAME} | ${page}` : SITE_NAME;
		document.title = title;
	}, [page]);
};
