import type { Tags } from '@/types/tags';

import cl from './TagsList.module.scss';
import TagMarker from '../UI/tagMarker/TagMarker';
import ButtonIconText from '../UI/buttonIconText/ButtonIconText';
import AddTagModal from '../Modals/addTagModal/AddTagModal';
import useTagsSnapshot from '@/hooks/useTagsSnapshot';
import Skeleton from 'react-loading-skeleton';
import VisuallyHiddenLoader from '../visuallyHiddenLoader/VisuallyHiddenLoader';
import ErrorMessage from '../UI/errorMessage/ErrorMessage';

import { NavLink } from 'react-router';
import { useState } from 'react';
import { LIMIT_TAGS } from '@/consts/docLimits';
import { ERRORS_MESSAGES, LOADING_MESSAGES, NOT_FOUND_MESSAGES } from '@/consts/messages';
import MessageInfo from '../UI/messageInfo/MessageInfo';

const TagsList = () => {
	const [tagsData, isLoading, error] = useTagsSnapshot();
	const [isOpenAddTag, setIsOpenAddTag] = useState(false);
	const tags: Tags | null[] = tagsData ?? new Array(4).fill(null);

	if (error) {
		return <ErrorMessage message={ERRORS_MESSAGES.tasksLoading} error={error} />;
	}

	return (
		<>
			<div className={cl.tags}>
				{tags.length === 0 ? (
					<MessageInfo message={NOT_FOUND_MESSAGES.tags} />
				) : (
					<nav>
						<VisuallyHiddenLoader isLoading={isLoading} hiddenMessage={LOADING_MESSAGES.tags}>
							<ul className={cl.list}>
								{tags.map((tag, index) => {
									const key = tag ? tag.id : index;

									return (
										<li className={cl.item} key={key}>
											{tag ? (
												<NavLink className={cl.link} to={'/other'}>
													<TagMarker color={tag.color} />

													<span className={cl.name}>{tag.name}</span>
												</NavLink>
											) : (
												<Skeleton className={cl.skeleton} />
											)}
										</li>
									);
								})}
							</ul>
						</VisuallyHiddenLoader>
					</nav>
				)}

				{tagsData && tagsData.length < LIMIT_TAGS && (
					<ButtonIconText
						className={cl['button']}
						icon="add_circle"
						size="small"
						onClick={() => setIsOpenAddTag(true)}
					>
						Добавить тег
					</ButtonIconText>
				)}
			</div>

			<AddTagModal isOpen={isOpenAddTag} onClose={() => setIsOpenAddTag(false)} />
		</>
	);
};

export default TagsList;
