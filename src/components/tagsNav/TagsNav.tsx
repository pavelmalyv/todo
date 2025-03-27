import type { Tags } from '@/types/tags';

import cl from './TagsNav.module.scss';
import TagMarker from '../UI/tagMarker/TagMarker';
import useTagsSnapshot from '@/hooks/useTagsSnapshot';
import Skeleton from 'react-loading-skeleton';
import VisuallyHiddenLoader from '../visuallyHiddenLoader/VisuallyHiddenLoader';
import ErrorMessage from '../UI/errorMessage/ErrorMessage';
import MessageInfo from '../UI/messageInfo/MessageInfo';
import AddTagButton from '../addTagButton/AddTagButton';

import { NavLink } from 'react-router';
import { ERRORS_MESSAGES, LOADING_MESSAGES, NOT_FOUND_MESSAGES } from '@/consts/messages';
import { getTagUrl } from '@/consts/routes';

const TagsNav = () => {
	const [tagsData, isLoading, error] = useTagsSnapshot();
	const tags: Tags | null[] = tagsData ?? new Array(4).fill(null);

	if (error) {
		return <ErrorMessage message={ERRORS_MESSAGES.tagsLoading} error={error} />;
	}

	return (
		<>
			<div>
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
												<NavLink className={cl.link} to={getTagUrl(tag.id)}>
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

				<AddTagButton tags={tagsData} className={cl['button']} />
			</div>
		</>
	);
};

export default TagsNav;
