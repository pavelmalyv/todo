import cl from './TagItem.module.scss';
import TagMarker from '../tagMarker/TagMarker';
import Skeleton from 'react-loading-skeleton';
import VisuallyHiddenLoader from '@/components/visuallyHiddenLoader/VisuallyHiddenLoader';

interface TagItemProps {
	color: string;
	name?: string;
	children: React.ReactNode;
	isLoading?: boolean;
	isSkeleton?: boolean;
}

const TagItem = ({ color, children, isLoading = false, isSkeleton }: TagItemProps) => {
	return (
		<div className={cl.item}>
			<VisuallyHiddenLoader isLoading={isLoading}>
				{isSkeleton ? (
					<Skeleton className={cl.skeleton} />
				) : (
					<div className={cl.label}>
						<TagMarker color={color} />
						<span className={cl.name}>{children}</span>
					</div>
				)}
			</VisuallyHiddenLoader>
		</div>
	);
};

export default TagItem;
