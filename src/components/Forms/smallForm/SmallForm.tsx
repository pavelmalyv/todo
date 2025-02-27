import Button from '@/components/UI/button/Button';
import cl from './SmallForm.module.scss';

interface SmallFormProps {
	children: React.ReactNode;
	buttonName: string;
	onSubmit: React.FormEventHandler<HTMLFormElement>;
	'aria-labelledby'?: string;
}

const SmallForm = ({
	children,
	buttonName,
	onSubmit,
	['aria-labelledby']: ariaLabelledby,
}: SmallFormProps) => {
	return (
		<form className={cl.form} aria-labelledby={ariaLabelledby} onSubmit={onSubmit} noValidate>
			{children}

			<Button type="submit" isFull={true}>
				{buttonName}
			</Button>
		</form>
	);
};

export default SmallForm;
