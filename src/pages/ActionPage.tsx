import ConfirmPasswordReset from '@/components/confirmPasswordReset/ConfirmPasswordReset';
import Book from '@/components/book/Book';
import MessageInfo from '@/components/UI/messageInfo/MessageInfo';
import useCheckActionCode from '@/hooks/data/useCheckActionCode';

import { getErrorMessageFirebase } from '@/utils/firebase';
import { useId } from 'react';
import { useTitle } from '@/hooks/ui/useTitle';
import { ERRORS_MESSAGES } from '@/consts/messages';
import { LOGIN_URL } from '@/consts/routes';

const SUPPORTED_ACTIONS = ['PASSWORD_RESET'];

const ActionPage = () => {
	useTitle();

	const titleId = useId();
	const [code, operation, isLoading, error] = useCheckActionCode(SUPPORTED_ACTIONS);
	const errorMessage = error ? getErrorMessageFirebase(error) : undefined;

	if (error !== undefined) {
		console.error(error);
	}

	let title: string;
	switch (operation) {
		case 'PASSWORD_RESET':
			title = 'Сброс пароля';
			break;
		default:
			title = 'Ошибка';
	}

	let body: React.ReactNode;
	let isBackButtonCenter = true;
	if (error || !code) {
		body = <MessageInfo message={errorMessage ?? ERRORS_MESSAGES.unknown} />;
		isBackButtonCenter = false;
	} else {
		switch (operation) {
			case 'PASSWORD_RESET': {
				body = <ConfirmPasswordReset code={code} />;
				break;
			}
		}
	}

	return (
		<Book aria-labelledby={titleId}>
			<Book.Main
				title={title}
				titleId={titleId}
				isLoading={isLoading}
				backButton={{
					to: LOGIN_URL,
					isCenter: isBackButtonCenter,
					text: 'Отмена',
				}}
			>
				{body}
			</Book.Main>
		</Book>
	);
};

export default ActionPage;
