import ConfirmPasswordReset from '@/components/confirmPasswordReset/ConfirmPasswordReset';
import Book from '@/components/book/Book';
import MessageInfo from '@/components/UI/messageInfo/MessageInfo';
import useCheckActionCode from '@/hooks/useCheckActionCode';

import { getErrorMessageFirebase } from '@/utils/firebase';
import { useId } from 'react';
import { ERRORS_MESSAGES } from '@/consts/messages';

const SUPPORTED_ACTIONS = ['PASSWORD_RESET'];

const ActionPage = () => {
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
	let isCancelButtonCenter = true;
	if (error || !code) {
		body = <MessageInfo message={errorMessage ?? ERRORS_MESSAGES.unknown} />;
		isCancelButtonCenter = false;
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
				isCancelButton={true}
				isCancelButtonCenter={isCancelButtonCenter}
				isLoading={isLoading}
			>
				{body}
			</Book.Main>
		</Book>
	);
};

export default ActionPage;
