import type { Tags } from '@/types/tags';

import cl from './TagsSelectList.module.scss';
import VisuallyHiddenLoader from '../visuallyHiddenLoader/VisuallyHiddenLoader';
import TagsSelect from '../UI/tagsSelect/TagsSelect';
import MessageInfo from '../UI/messageInfo/MessageInfo';
import ErrorMessage from '../UI/errorMessage/ErrorMessage';
import AddTagButton from '../addTagButton/AddTagButton';
import useTagsSnapshot from '@/hooks/useTagsSnapshot';

import { forwardRef } from 'react';
import { ERRORS_MESSAGES, LOADING_MESSAGES, NOT_FOUND_MESSAGES } from '@/consts/messages';

interface TagsSelectListProps {
	name: string;
	disabled?: boolean;
	errorMessage?: string;
	value?: string;
	onChange?: React.ChangeEventHandler<HTMLInputElement>;
	onBlur?: React.FocusEventHandler<HTMLInputElement>;
	'aria-controls'?: string;
	'aria-invalid'?: boolean;
	'aria-required'?: boolean;
}

const TagsSelectList = forwardRef<HTMLInputElement, TagsSelectListProps>(
	(
		{
			name,
			disabled,
			errorMessage,
			value,
			onChange,
			onBlur,
			'aria-controls': ariaControls,
			'aria-invalid': ariaInvalid,
			'aria-required': ariaRequired,
		},
		ref,
	) => {
		const [tagsData, isLoading, error] = useTagsSnapshot();
		const tags: Tags | null[] = tagsData ?? new Array(4).fill(null);

		if (error) {
			return <ErrorMessage message={ERRORS_MESSAGES.tagsLoading} error={error} />;
		}

		return (
			<div className={cl['tags-list']}>
				<TagsSelect errorMessage={errorMessage}>
					{tags.length === 0 ? (
						<MessageInfo message={NOT_FOUND_MESSAGES.tags} />
					) : (
						<VisuallyHiddenLoader isLoading={isLoading} hiddenMessage={LOADING_MESSAGES.tags}>
							{tags.map((tag, index) => {
								if (!tag) {
									return <TagsSelect.Tag key={index} isSkeleton={true} />;
								}

								return (
									<TagsSelect.Tag
										key={tag.id}
										ref={ref}
										name={name}
										value={tag.id}
										disabled={disabled}
										checked={value == tag.id}
										color={tag.color}
										onChange={onChange}
										onBlur={onBlur}
										aria-controls={ariaControls}
										aria-invalid={ariaInvalid}
										aria-required={ariaRequired}
									>
										{tag.name}
									</TagsSelect.Tag>
								);
							})}
						</VisuallyHiddenLoader>
					)}
				</TagsSelect>

				<AddTagButton tags={tagsData} />
			</div>
		);
	},
);

export default TagsSelectList;
