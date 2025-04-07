import type { BaseFieldProps } from '@/types/baseProps';

import cl from './FieldText.module.scss';
import FieldBase from '../fieldBase/FieldBase';
import ButtonIcon from '../../Buttons/buttonIcon/ButtonIcon';
import { forwardRef, useId, useState } from 'react';

type FieldTextProps = BaseFieldProps & {
	isPassword?: boolean;
	className?: string;
};

const FieldText = forwardRef<HTMLInputElement, FieldTextProps>(
	({ isPassword = false, className, ...props }, ref) => {
		const fieldId = useId();
		const [isPasswordState, setIsPasswordState] = useState(true);
		const type = isPassword && isPasswordState ? 'password' : 'text';

		return (
			<FieldBase
				ref={ref}
				type={type}
				id={fieldId}
				className={{ body: cl.body, field: className }}
				{...props}
			>
				{isPassword && (
					<ButtonIcon
						hiddenName={'Показать пароль'}
						onClick={() => setIsPasswordState((prev) => !prev)}
						aria-pressed={!isPasswordState}
						aria-controls={fieldId}
						className={cl.button}
					>
						{isPasswordState ? 'visibility' : 'visibility_off'}
					</ButtonIcon>
				)}
			</FieldBase>
		);
	},
);

export default FieldText;
