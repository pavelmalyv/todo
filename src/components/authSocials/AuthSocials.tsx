import type { CredentialResponse } from '@react-oauth/google';

import cl from './AuthSocials.module.scss';
import useDelayedLoader from '@/hooks/useDelayedLoader';
import Checkbox from '../UI/checkbox/Checkbox';
import RegistrationModal from '../Modals/RegistrationModal/RegistrationModal';

import { auth } from '@/firebase';
import { showError } from '@/utils/notification';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { googleIdTokenSchema } from '@/schemas/auth';
import { useState } from 'react';
import { Link } from 'react-router';
import { ERRORS_MESSAGES } from '@/consts/messages';

const AuthSocials = () => {
	const [isOpenPolicy, setIsOpenPolicy] = useState(false);
	const [isLoadingAuth, setIsLoadingAuth] = useState(false);
	const isLoadingAuthDelayed = useDelayedLoader(isLoadingAuth);

	const handleGoogleAuthError = (error?: unknown) => {
		showError(ERRORS_MESSAGES.googleAuth, error);
	};

	const authWithCredential = async (idToken: string) => {
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

	const successGoogleLoginHandle = async (credentialResponse: CredentialResponse) => {
		const idToken = credentialResponse.credential;
		if (!idToken) {
			handleGoogleAuthError();
			return;
		}

		const idTokenDecoded = jwtDecode(idToken);

		try {
			await googleIdTokenSchema.validate(idTokenDecoded);
		} catch (error) {
			console.error(error);
			handleGoogleAuthError();
			return;
		}

		await authWithCredential(idToken);
	};

	const registrationCompleteHandle = () => {};

	return (
		<>
			<div className={cl['login-socials']}>
				<div className={cl.label}>или</div>

				<div className={cl.google}>
					<div className={cl['google-wrapper']}>
						<GoogleLogin onSuccess={successGoogleLoginHandle} onError={handleGoogleAuthError} />

						{isLoadingAuthDelayed && (
							<div className={cl.loader}>
								<div className={cl['loader-spinner']}></div>
							</div>
						)}
					</div>
				</div>
			</div>

			<RegistrationModal
				title="Завершение регистрации"
				isOpen={isOpenPolicy}
				onClose={() => setIsOpenPolicy(false)}
				onSubmit={() => registrationCompleteHandle}
			>
				<Checkbox
					label={
						<>
							Я принимаю{' '}
							<Link className="link" to="#">
								политику
								<br /> конфиденциальности
							</Link>
						</>
					}
					aria-required={true}
				/>
			</RegistrationModal>
		</>
	);
};

export default AuthSocials;
