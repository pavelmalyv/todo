import classNames from 'classnames';
import cl from './AuthSocials.module.scss';

interface AuthSocialsProps {
	children: React.ReactNode;
}

const AuthSocials = ({ children }: AuthSocialsProps) => {
	return (
		<div className={cl['login-socials']}>
			<div className={cl.label}>или</div>
			<ul className={cl.list}>{children}</ul>
		</div>
	);
};

interface SocialItemProps {
	isLoading?: boolean;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Google = ({ isLoading = false, onClick }: SocialItemProps) => {
	return (
		<li className={cl.item}>
			<button type="button" className={cl.button} disabled={isLoading} onClick={onClick}>
				<span className={cl['button-body']}>
					<img
						src="/img/icons/google.svg"
						className={cl['button-icon']}
						width={24}
						height={24}
						alt=""
					/>
					<span>Google</span>
				</span>

				<span
					className={classNames(cl['button-spinner-wrapper'], {
						[cl['button-spinner-wrapper_visible']]: isLoading,
					})}
				>
					<span className={cl['button-spinner']}></span>
				</span>
			</button>
		</li>
	);
};

AuthSocials.Google = Google;

export default AuthSocials;
