import type { CredentialResponse } from '@react-oauth/google';
import type { GoogleIdTokenSchema } from '@/types/auth';

import cl from './AuthSocials.module.scss';
import useDelayedLoader from '@/hooks/useDelayedLoader';
import Checkbox from '../UI/checkbox/Checkbox';
import RegistrationModal from '../Modals/RegistrationModal/RegistrationModal';

import { auth } from '@/firebase';
import { showError } from '@/utils/notification';
import { googleIdTokenSchema } from '@/schemas/auth';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useRef, useState } from 'react';
import { Link } from 'react-router';
import { Controller, useForm } from 'react-hook-form';
import { InferType, object } from 'yup';
import { policySchema } from '@/schemas/fields';
import { yupResolver } from '@hookform/resolvers/yup';
import {
	fetchSignInMethodsForEmail,
	GoogleAuthProvider,
	signInWithCredential,
} from 'firebase/auth';

import { ERRORS_MESSAGES } from '@/consts/messages';

const registrationFormSchema = object({
	policy: policySchema,
});

type RegistrationFormData = InferType<typeof registrationFormSchema>;

const AuthSocials = () => {
	const [isOpenRegistrationComplete, setIsOpenRegistrationComplete] = useState(false);
	const [isLoadingAuth, setIsLoadingAuth] = useState(false);
	const isLoadingAuthDelayed = useDelayedLoader(isLoadingAuth);
	const idTokenRef = useRef<string | null>(null);

	const { control, handleSubmit } = useForm<RegistrationFormData>({
		resolver: yupResolver(registrationFormSchema),
		defaultValues: {
			policy: false,
		},
	});

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
		let userLoginInfo: GoogleIdTokenSchema | undefined;

		try {
			userLoginInfo = await googleIdTokenSchema.validate(idTokenDecoded);
		} catch (error) {
			console.error(error);
			handleGoogleAuthError();
			return;
		}

		const signInMethods = await fetchSignInMethodsForEmail(auth, userLoginInfo.email);
		if (signInMethods.length > 0) {
			await authWithCredential(idToken);
			return;
		}

		idTokenRef.current = idToken;
		setIsOpenRegistrationComplete(true);
	};

	const registrationCompleteHandle = async () => {
		const idToken = idTokenRef.current;
		if (!idToken) {
			handleGoogleAuthError();
			return;
		}

		await authWithCredential(idToken);
	};

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
				isLoading={isLoadingAuthDelayed}
				isOpen={isOpenRegistrationComplete}
				onClose={() => setIsOpenRegistrationComplete(false)}
				onSubmit={handleSubmit(registrationCompleteHandle)}
			>
				<Controller
					name="policy"
					control={control}
					render={({ field, fieldState }) => {
						const policyLabel = (
							<>
								Я принимаю{' '}
								<Link className="link" to="#">
									политику конфиденциальности
								</Link>
							</>
						);

						return (
							<Checkbox
								label={policyLabel}
								{...field}
								aria-required={true}
								aria-invalid={fieldState.invalid}
								errorMessage={fieldState.error?.message}
							/>
						);
					}}
				/>
			</RegistrationModal>
		</>
	);
};

export default AuthSocials;
