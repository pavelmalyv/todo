import classNames from 'classnames';
import cl from './Auth.module.scss';
import SmallForm from '@/components/Forms/smallForm/SmallForm';
import AuthSocials from '../authSocials/AuthSocials';

import { Link } from 'react-router';

interface AuthProps {
	type?: 'signin' | 'signup';
	title: string;
	titleId?: string;
	children: React.ReactNode;
	isLoading?: boolean;
	errorMessage?: string;
	buttonName: string;
	footer: {
		description: string;
		linkName: string;
		linkUrl: string;
	};
	onSubmit?: React.FormEventHandler<HTMLFormElement>;
}

const Auth = ({
	type,
	title,
	titleId,
	children,
	isLoading,
	errorMessage,
	buttonName,
	footer,
	onSubmit,
}: AuthProps) => {
	return (
		<div className={cl.authorization}>
			<h1 id={titleId} className={classNames('h1', cl.title)}>
				{title}
			</h1>

			<SmallForm
				aria-labelledby={titleId}
				buttonName={buttonName}
				errorMessage={errorMessage}
				isLoading={isLoading}
				className={cl.form}
				onSubmit={onSubmit}
			>
				{children}
			</SmallForm>

			<AuthSocials className={cl['login-socials']} type={type} />

			<div className={cl.registration}>
				{footer.description}{' '}
				<Link to={footer.linkUrl} className="link">
					{footer.linkName}
				</Link>
			</div>
		</div>
	);
};

export default Auth;
