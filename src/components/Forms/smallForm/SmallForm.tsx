import cl from './SmallForm.module.scss';

interface SmallFormProps {
	'aria-labelledby'?: string;
}

const SmallForm = ({ ['aria-labelledby']: ariaLabelledby }: SmallFormProps) => {
	return <form className={cl.form} aria-labelledby={ariaLabelledby}></form>;
};

export default SmallForm;
