import classNames from 'classnames';
import cl from './Auth.module.scss';
import SmallForm from '@/components/Forms/smallForm/SmallForm';
import AuthSocials from '../authSocials/AuthSocials';

import { Link } from 'react-router';

interface AuthProps {
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

			<div className={cl.form}>
				<SmallForm
					aria-labelledby={titleId}
					buttonName={buttonName}
					errorMessage={errorMessage}
					onSubmit={onSubmit}
					isLoading={isLoading}
				>
					{children}
				</SmallForm>
			</div>

			<div className={cl['login-socials']}>
				<AuthSocials />
			</div>

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
