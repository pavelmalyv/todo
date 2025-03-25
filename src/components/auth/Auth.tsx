import cl from './Auth.module.scss';
import SmallForm from '@/components/Forms/smallForm/SmallForm';
import AuthSocials from '../authSocials/AuthSocials';
import { Link } from 'react-router';

interface AuthProps {
	type?: 'signin' | 'signup';
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
	titleId,
	children,
	isLoading,
	errorMessage,
	buttonName,
	footer,
	onSubmit,
}: AuthProps) => {
	return (
		<div>
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

			<small className={cl.policy}>
				Продолжая аутентификацию вы соглашаетесь с{' '}
				<Link to={'#'} target="_blank" className="link">
					политикой конфиденциальности
				</Link>
			</small>

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
