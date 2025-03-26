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
	footerLinks: {
		description?: string;
		linkName: string;
		linkUrl: string;
	}[];
	onSubmit?: React.FormEventHandler<HTMLFormElement>;
}

const Auth = ({
	type,
	titleId,
	children,
	isLoading,
	errorMessage,
	buttonName,
	footerLinks,
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

			<ul className={cl.links}>
				{footerLinks.map((link) => (
					<li key={link.linkUrl}>
						{link.description}{' '}
						<Link to={link.linkUrl} className="link">
							{link.linkName}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Auth;
