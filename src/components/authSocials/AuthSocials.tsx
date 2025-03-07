import type { CredentialResponse } from '@react-oauth/google';

import classNames from 'classnames';
import cl from './AuthSocials.module.scss';
import useDelayedLoader from '@/hooks/useDelayedLoader';

import { auth } from '@/firebase';
import { showError } from '@/utils/notification';
import { GoogleLogin } from '@react-oauth/google';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { useState } from 'react';
import { ERRORS_MESSAGES } from '@/consts/messages';

interface AuthSocialsProps {
	type?: 'signin' | 'signup';
	className?: string;
}

const AuthSocials = ({ type, className }: AuthSocialsProps) => {
	const [isLoadingAuth, setIsLoadingAuth] = useState(false);
	const isLoadingAuthDelayed = useDelayedLoader(isLoadingAuth);

	const handleGoogleAuthError = (error?: unknown) => {
		showError(ERRORS_MESSAGES.googleAuth, error);
	};

	const successGoogleLoginHandle = async (credentialResponse: CredentialResponse) => {
		const idToken = credentialResponse.credential;
		const credential = GoogleAuthProvider.credential(idToken);

		try {
			setIsLoadingAuth(true);
			await signInWithCredential(auth, credential);
		} catch (error) {
			handleGoogleAuthError(error);
		} finally {
			setIsLoadingAuth(false);
		}
	};

	let googleLoginText: 'signin_with' | 'signup_with' | 'continue_with';

	if (type === 'signin') {
		googleLoginText = 'signin_with';
	} else if (type === 'signup') {
		googleLoginText = 'signup_with';
	} else {
		googleLoginText = 'continue_with';
	}

	return (
		<>
			<div className={classNames(cl['login-socials'], className)}>
				<div className={cl.label}>или</div>

				<div className={cl.google}>
					<div className={cl['google-wrapper']}>
						<GoogleLogin
							onSuccess={successGoogleLoginHandle}
							onError={handleGoogleAuthError}
							text={googleLoginText}
						/>

						{isLoadingAuthDelayed && (
							<div className={cl.loader}>
								<div className={cl['loader-spinner']}></div>
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default AuthSocials;
