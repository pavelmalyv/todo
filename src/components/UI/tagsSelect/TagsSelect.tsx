import cl from './TagsSelect.module.scss';
import TagMarker from '../tagMarker/TagMarker';
import Skeleton from 'react-loading-skeleton';
import ErrorField from '../errorField/ErrorField';

import { forwardRef, useId } from 'react';
import { createCompoundContext } from '@/context/createCompoundContext';

interface TagsSelectProps {
	errorMessage?: string;
	children: React.ReactNode;
}

interface TagsSelectContext {
	errorMessageId: string;
}

const [useTagsSelectContext, TagsSelectProvider] = createCompoundContext<TagsSelectContext>();

const TagsSelect = ({ errorMessage, children }: TagsSelectProps) => {
	const legend = 'Теги:';
	const errorMessageId = useId();

	return (
		<TagsSelectProvider
			value={{
				errorMessageId,
			}}
		>
			<fieldset>
				<legend className="visually-hidden">{legend}</legend>
				<div className={cl.legend} aria-hidden="true">
					{legend}
				</div>

				<div className={cl.tags}>{children}</div>

				<ErrorField id={errorMessageId} message={errorMessage ? errorMessage : null} />
			</fieldset>
		</TagsSelectProvider>
	);
};

type TagProps =
	| {
			isSkeleton: true;
			name?: never;
			color?: never;
			value?: never;
			disabled?: never;
			checked?: never;
			children?: never;
			onChange?: never;
			onBlur?: never;
			'aria-controls'?: never;
			'aria-invalid'?: never;
			'aria-required'?: never;
	  }
	| {
			isSkeleton?: false;
			name: string;
			color: string;
			value?: string;
			disabled?: boolean;
			checked?: boolean;
			children: React.ReactNode;
			onChange?: React.ChangeEventHandler<HTMLInputElement>;
			onBlur?: React.FocusEventHandler<HTMLInputElement>;
			'aria-controls'?: string;
			'aria-invalid'?: boolean;
			'aria-required'?: boolean;
	  };

const Tag = forwardRef<HTMLInputElement, TagProps>(
	(
		{
			isSkeleton,
			name,
			color,
			value,
			disabled,
			checked,
			children,
			onChange,
			onBlur,
			'aria-controls': ariaControls,
			'aria-invalid': ariaInvalid,
			'aria-required': ariaRequired,
		},
		ref,
	) => {
		const titleId = useId();
		const { errorMessageId } = useTagsSelectContext();

		return (
			<div className={cl.item}>
				{isSkeleton ? (
					<Skeleton className={cl.skeleton} />
				) : (
					<>
						<input
							id={titleId}
							type="checkbox"
							className={cl.checkbox}
							ref={ref}
							name={name}
							value={value}
							disabled={disabled}
							checked={checked}
							onChange={onChange}
							onBlur={onBlur}
							aria-controls={ariaControls}
							aria-invalid={ariaInvalid}
							aria-required={ariaRequired}
							aria-describedby={errorMessageId}
						/>
						<label htmlFor={titleId} className={cl.label}>
							<TagMarker color={color} />
							<span className={cl.name}>{children}</span>
						</label>
					</>
				)}
			</div>
		);
	},
);

TagsSelect.Tag = Tag;

export default TagsSelect;
