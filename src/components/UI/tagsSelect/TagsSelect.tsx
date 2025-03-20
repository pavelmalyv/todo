import cl from './TagsSelect.module.scss';
import TagMarker from '../tagMarker/TagMarker';
import Skeleton from 'react-loading-skeleton';
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

type TagProps =
	| {
			isSkeleton: true;
			color?: never;
			value?: never;
			children?: never;
			onChange?: never;
	  }
	| {
			isSkeleton?: false;
			color: string;
			value?: string;
			children: React.ReactNode;
			onChange?: React.ChangeEventHandler<HTMLInputElement>;
	  };

const Tag = ({ color, children, value, isSkeleton, onChange }: TagProps) => {
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
			{isSkeleton ? (
				<Skeleton className={cl.skeleton} />
			) : (
				<label htmlFor={titleId} className={cl.label}>
					<TagMarker color={color} />
					<span className={cl.name}>{children}</span>
				</label>
			)}
		</div>
	);
};

TagsSelect.Tag = Tag;

export default TagsSelect;
