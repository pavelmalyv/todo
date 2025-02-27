import classNames from 'classnames';
import cl from './AuthSocials.module.scss';

import { auth } from '@/firebase';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useEffect } from 'react';
import { isErrorFirebase } from '@/utils/firebase';
import { showError } from '@/utils/notification';
import { ERRORS_MESSAGES } from '@/consts/messages';

const USER_CANCELLED_CODES = ['auth/popup-closed-by-user', 'auth/user-cancelled'];

const AuthSocials = () => {
	const [signInWithGoogle, , isLoading, error] = useSignInWithGoogle(auth);

	useEffect(() => {
		if (!error) {
			return;
		}

		if (isErrorFirebase(error) && USER_CANCELLED_CODES.includes(error.code)) {
			return;
		}

		showError(ERRORS_MESSAGES.googleAuth, error);
	}, [error]);

	const handleClickGoogle = async () => {
		await signInWithGoogle();
	};

	return (
		<div className={cl['login-socials']}>
			<div className={cl.label}>или</div>
			<ul className={cl.list}>
				<li className={cl.item}>
					<button
						type="button"
						className={cl.button}
						disabled={isLoading}
						onClick={handleClickGoogle}
					>
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
			</ul>
		</div>
	);
};

export default AuthSocials;
