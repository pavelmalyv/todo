import Profile from '@/components/profile/Profile';
import Section from '@/components/UI/section/Section';
import TasksList from '@/components/tasksList/TasksList';
import Button from '@/components/UI/button/Button';
import useTasksSnapshot from '@/hooks/useTasksSnapshot';
import useQuantityTasksSnapshot from '@/hooks/useQuantityTasksSnapshot';
import useNotificationError from '@/hooks/useNotificationError';

import { getDateRanges } from '@/utils/date';
import { getQuantityShort } from '@/utils/quantity';
import { showError } from '@/utils/notification';
import { useId } from 'react';
import { LIMIT_QUANTITY_TODAY, LIMIT_TODAY } from '@/consts/docLimits';
import { ERRORS_MESSAGES, NOT_FOUND_MESSAGES } from '@/consts/messages';

const TodayPage = () => {
	const dateRanges = getDateRanges();

	const [tasks, isLoading, errorToday, { fetchMore, isLoadingMore, hasMoreData }] =
		useTasksSnapshot({
			timestampStart: dateRanges.today.start,
			timestampEnd: dateRanges.today.end,
			limit: LIMIT_TODAY,
		});
	const tasksToday = tasks ? tasks : new Array(LIMIT_TODAY).fill(null);

	const [quantity, isLoadingQuantity, errorQuantityToday] = useQuantityTasksSnapshot({
		timestampStart: dateRanges.today.start,
		timestampEnd: dateRanges.today.end,
		limit: LIMIT_QUANTITY_TODAY + 1,
	});

	useNotificationError(ERRORS_MESSAGES.quantityTodayTasksLoading, errorQuantityToday);

	const handleFetchMore = () => {
		try {
			fetchMore();
		} catch (error) {
			showError(ERRORS_MESSAGES.tasksLoading, error);
		}
	};

	const quantityShort = quantity !== null ? getQuantityShort(quantity, LIMIT_QUANTITY_TODAY) : null;
	const titleId = useId();

	return (
		<Profile title="Сегодня" quantity={quantityShort} isLoadingQuantity={isLoadingQuantity}>
			<Section title="Задачи" titleId={titleId}>
				<TasksList
					tasks={tasksToday}
					isLoading={isLoading}
					notFoundMessage={NOT_FOUND_MESSAGES.todayTasks}
					error={errorToday}
					aria-labelledby={titleId}
				>
					{hasMoreData && (
						<TasksList.Button>
							<Button
								style="border"
								size="small"
								onClick={handleFetchMore}
								isLoading={isLoadingMore}
							>
								Загрузить еще
							</Button>
						</TasksList.Button>
					)}
				</TasksList>
			</Section>
		</Profile>
	);
};

export default TodayPage;
