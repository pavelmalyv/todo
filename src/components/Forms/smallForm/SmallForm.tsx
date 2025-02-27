import Button from '@/components/UI/button/Button';
import cl from './SmallForm.module.scss';
import ErrorMessage from '@/components/UI/errorMessage/ErrorMessage';

interface SmallFormProps {
	children: React.ReactNode;
	buttonName: string;
	errorMessage?: string;
	isLoading: boolean;
	onSubmit: React.FormEventHandler<HTMLFormElement>;
	'aria-labelledby'?: string;
}

const SmallForm = ({
	children,
	buttonName,
	errorMessage,
	isLoading,
	onSubmit,
	['aria-labelledby']: ariaLabelledby,
}: SmallFormProps) => {
	return (
		<form className={cl.form} aria-labelledby={ariaLabelledby} onSubmit={onSubmit} noValidate>
			<div className={cl.fields}>{children}</div>

			<Button type="submit" isFull={true} isLoading={isLoading}>
				{buttonName}
			</Button>

			<div className={cl.error}>
				<ErrorMessage message={errorMessage} />
			</div>
		</form>
	);
};

export default SmallForm;
