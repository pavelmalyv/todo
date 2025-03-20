import classNames from 'classnames';
import cl from './SmallForm.module.scss';
import ErrorMessage from '@/components/UI/errorMessage/ErrorMessage';
import Button from '@/components/UI/button/Button';

interface SmallFormProps {
	children: React.ReactNode;
	buttonName?: string;
	isDisabledButtonName?: boolean;
	errorMessage?: string;
	isLoading?: boolean;
	className?: string;
	onSubmit?: React.FormEventHandler<HTMLFormElement>;
	'aria-labelledby'?: string;
}

const SmallForm = ({
	children,
	buttonName,
	isDisabledButtonName,
	errorMessage,
	isLoading = false,
	className,
	onSubmit,
	['aria-labelledby']: ariaLabelledby,
}: SmallFormProps) => {
	const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
		e.stopPropagation();

		if (onSubmit) {
			onSubmit(e);
		}
	};
	return (
		<form
			className={classNames(cl.form, className)}
			aria-labelledby={ariaLabelledby}
			onSubmit={handleSubmit}
			noValidate
		>
			<fieldset className={cl.body} disabled={isLoading}>
				{children}

				{buttonName && (
					<div className={cl.footer}>
						<Button
							type="submit"
							isFull={true}
							isLoading={isLoading}
							disabled={isDisabledButtonName}
						>
							{buttonName}
						</Button>
					</div>
				)}
			</fieldset>

			<ErrorMessage
				className={classNames(cl.error, { [cl['error_visible']]: errorMessage })}
				message={errorMessage}
			/>
		</form>
	);
};

interface FooterProps {
	children: React.ReactNode;
}

const Footer = ({ children }: FooterProps) => {
	return <div className={cl.footer}>{children}</div>;
};

SmallForm.Footer = Footer;

export default SmallForm;
