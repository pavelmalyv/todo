import cl from './TagsSelect.module.scss';
import TagMarker from '../tagMarker/TagMarker';
import { useId } from 'react';

interface TagsSelectProps {
	children: React.ReactNode;
}

const TagsSelect = ({ children }: TagsSelectProps) => {
	const legend = 'Теги:';

	return (
		<fieldset>
			<legend className="visually-hidden">{legend}</legend>
			<div className={cl.legend} aria-hidden="true">
				{legend}
			</div>

			<div className={cl.tags}>{children}</div>
		</fieldset>
	);
};

interface TagProps {
	color: string;
	value?: string;
	onChange?: React.ChangeEventHandler<HTMLInputElement>;
	children: React.ReactNode;
}

const Tag = ({ color, children, value, onChange }: TagProps) => {
	const titleId = useId();

	return (
		<div className={cl.item}>
			<input
				id={titleId}
				type="checkbox"
				className={cl.checkbox}
				value={value}
				onChange={onChange}
			/>
			<label htmlFor={titleId} className={cl.label}>
				<TagMarker color={color} />
				<span className={cl.name}>{children}</span>
			</label>
		</div>
	);
};

TagsSelect.Tag = Tag;

export default TagsSelect;
