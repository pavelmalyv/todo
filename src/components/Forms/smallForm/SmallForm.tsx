import classNames from 'classnames';
import cl from './SmallForm.module.scss';
import ErrorMessage from '@/components/UI/errorMessage/ErrorMessage';
import Button from '@/components/UI/button/Button';

type SmallFormProps = {
	children: React.ReactNode;
	buttonName: string;
	isDisabledButtonName?: boolean;
	errorMessage?: string;
	isLoading?: boolean;
	className?: string;
	onSubmit?: React.FormEventHandler<HTMLFormElement>;
	'aria-labelledby'?: string;
} & (
	| {
			deleteButtonName?: never;
			deleteButtonOnClick?: never;
	  }
	| {
			deleteButtonName: string;
			deleteButtonOnClick: React.MouseEventHandler<HTMLButtonElement>;
	  }
);

const SmallForm = ({
	children,
	buttonName,
	isDisabledButtonName,
	deleteButtonName,
	errorMessage,
	isLoading = false,
	className,
	onSubmit,
	deleteButtonOnClick,
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

				<div className={cl.buttons}>
					{deleteButtonName && (
						<Button action="delete" isFull={true} onClick={deleteButtonOnClick}>
							{deleteButtonName}
						</Button>
					)}

					<Button type="submit" isFull={true} isLoading={isLoading} disabled={isDisabledButtonName}>
						{buttonName}
					</Button>
				</div>
			</fieldset>

			<ErrorMessage className={cl.error} message={errorMessage} />
		</form>
	);
};

export default SmallForm;
