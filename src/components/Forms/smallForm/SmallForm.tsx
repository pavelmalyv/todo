import Button from '@/components/UI/button/Button';
import cl from './SmallForm.module.scss';

interface SmallFormProps {
	children: React.ReactNode;
	buttonName: string;
	'aria-labelledby'?: string;
}

const SmallForm = ({
	children,
	buttonName,
	['aria-labelledby']: ariaLabelledby,
}: SmallFormProps) => {
	return (
		<form className={cl.form} aria-labelledby={ariaLabelledby}>
			{children}

			<Button type="submit" isFull={true}>
				{buttonName}
			</Button>
		</form>
	);
};

export default SmallForm;
