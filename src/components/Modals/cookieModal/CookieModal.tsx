import cl from './CookieModal.module.scss';

import AppModal from '@/components/UI/appModal/AppModal';
import classNames from 'classnames';
import Button from '@/components/UI/Buttons/button/Button';

import { useEffect, useId, useState } from 'react';
import { boolean, date, InferType, object } from 'yup';

const cookieAcceptSchema = object({
	accept: boolean().required(),
	end: date().required(),
});

type CookieAccept = InferType<typeof cookieAcceptSchema>;

const setCookieAccept = () => {
	const endDate = new Date();
	endDate.setDate(endDate.getDate() + 14);

	const cookieAccept: CookieAccept = {
		accept: true,
		end: endDate,
	};

	localStorage.setItem('cookie-accept', JSON.stringify(cookieAccept));
};

const getCookieAccept = async () => {
	const cookieLocalStorage = localStorage.getItem('cookie-accept');
	if (!cookieLocalStorage) {
		return false;
	}

	try {
		const cookieLocalStorageObj = JSON.parse(cookieLocalStorage);
		const cookieAccept = await cookieAcceptSchema.validate(cookieLocalStorageObj);
		const currentDate = new Date();
		const endDate = new Date(cookieAccept.end);

		return cookieAccept.accept && currentDate < endDate;
	} catch (error) {
		console.error(error);
		console.error('The "cookie-accept" parameter of the local storage has been cleared');
		localStorage.removeItem('cookie-accept');

		return false;
	}
};

const CookieModal = () => {
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		(async () => {
			const isCookieAccept = await getCookieAccept();
			if (isCookieAccept) {
				return;
			}

			setIsOpen(true);
		})();
	}, []);

	const handleClose = () => {
		setIsOpen(false);
		setCookieAccept();
	};

	const titleId = useId();

	return (
		<AppModal
			role="alertdialog"
			styleModal="dialog"
			aria-labelledby={titleId}
			isOpen={isOpen}
			onClose={handleClose}
			className={{ root: cl.root }}
		>
			<h2 id={titleId} className={classNames('h2', cl.title)}>
				Cookie
			</h2>
			<div className={cl.body}>
				<div>Этот сайт использует файлы куки</div>
				<Button size="medium" onClick={handleClose}>
					Принять
				</Button>
			</div>
		</AppModal>
	);
};

export default CookieModal;
