import cl from './DayCell.module.scss';
import VisuallyHiddenLoader from '@/components/visuallyHiddenLoader/VisuallyHiddenLoader';
import ErrorMessage from '@/components/UI/errorMessage/ErrorMessage';
import Skeleton from 'react-loading-skeleton';
import { ERRORS_MESSAGES, LOADING_MESSAGES } from '@/consts/messages';

interface DayCellProps {
	dayText: string;
	isSkeleton: boolean;
	isLoading: boolean;
	error: Error | undefined;
	skeletonHeight: number;
}

const DayCell = ({ dayText, isSkeleton, isLoading, error, skeletonHeight }: DayCellProps) => {
	return (
		<VisuallyHiddenLoader isLoading={isLoading} hiddenMessage={LOADING_MESSAGES.tasks}>
			<div className={cl.day}>{dayText}</div>

			{error ? (
				<ErrorMessage message={ERRORS_MESSAGES.tasksLoadingShort} />
			) : (
				<>
					{isSkeleton && (
						<div className={cl.skeletons}>
							<Skeleton className={cl.skeleton} count={2} inline={true} height={skeletonHeight} />
						</div>
					)}
				</>
			)}
		</VisuallyHiddenLoader>
	);
};

export default DayCell;
