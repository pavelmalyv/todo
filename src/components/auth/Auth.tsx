import classNames from 'classnames';
import cl from './Auth.module.scss';
import SmallForm from '@/components/Forms/smallForm/SmallForm';

import { Link } from 'react-router';
import { createCompoundContext } from '@/context/createCompoundContext';

interface AuthProps {
	title: string;
	titleId?: string;
	children: React.ReactNode;
	footer: {
		description: string;
		linkName: string;
		linkUrl: string;
	};
}

const [useContextAuth, AuthProvider] = createCompoundContext<{ titleId?: string }>();

const Auth = ({ title, titleId, children, footer }: AuthProps) => {
	return (
		<AuthProvider value={{ titleId }}>
			<div className={cl.authorization}>
				<h1 id={titleId} className={classNames('h1', cl.title)}>
					{title}
				</h1>

				{children}

				<div className={cl.registration}>
					{footer.description}{' '}
					<Link to={footer.linkUrl} className="link">
						{footer.linkName}
					</Link>
				</div>
			</div>
		</AuthProvider>
	);
};

interface FormProps {
	isLoading?: boolean;
	errorMessage?: string;
	buttonName: string;
	children: React.ReactNode;
	onSubmit?: React.FormEventHandler<HTMLFormElement>;
}

const Form = ({ isLoading, errorMessage, buttonName, children, onSubmit }: FormProps) => {
	const { titleId } = useContextAuth();

	return (
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
	);
};

Auth.Form = Form;

interface LoginSocialsProps {
	children: React.ReactNode;
}

const LoginSocials = ({ children }: LoginSocialsProps) => {
	return <div className={cl['login-socials']}>{children}</div>;
};

Auth.LoginSocials = LoginSocials;

export default Auth;
