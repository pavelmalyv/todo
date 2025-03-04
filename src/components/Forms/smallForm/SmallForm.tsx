import classNames from 'classnames';
import cl from './SmallForm.module.scss';
import ErrorMessage from '@/components/UI/errorMessage/ErrorMessage';
import Button from '@/components/UI/button/Button';

interface SmallFormProps {
	children: React.ReactNode;
	buttonName: string;
	errorMessage?: string;
	isLoading?: boolean;
	className?: string;
	onSubmit?: React.FormEventHandler<HTMLFormElement>;
	'aria-labelledby'?: string;
}

const SmallForm = ({
	children,
	buttonName,
	errorMessage,
	isLoading = false,
	className,
	onSubmit,
	['aria-labelledby']: ariaLabelledby,
}: SmallFormProps) => {
	return (
		<form
			className={classNames(cl.form, className)}
			aria-labelledby={ariaLabelledby}
			onSubmit={onSubmit}
			noValidate
		>
			<fieldset disabled={isLoading}>
				<div className={cl.fields}>{children}</div>

				<Button type="submit" isFull={true} isLoading={isLoading}>
					{buttonName}
				</Button>
			</fieldset>

			<div className={cl.error}>
				<ErrorMessage message={errorMessage} />
			</div>
		</form>
	);
};

export default SmallForm;
