import type { Task, TaskId } from '@/types/tasks';

import cl from './ViewTaskModal.module.scss';
import Checkbox from '@/components/UI/checkbox/Checkbox';
import AppModal from '@/components/UI/appModal/AppModal';
import Button from '@/components/UI/button/Button';
import TagItem from '@/components/UI/tagItem/TagItem';
import DescriptionList from '@/components/UI/descriptionList/DescriptionList';
import ErrorMessage from '@/components/UI/errorMessage/ErrorMessage';
import EditTaskModal from '../editTaskModal/EditTaskModal';
import useSetDoneTask from '@/hooks/data/useSetDoneTask';
import useTagSnapshot from '@/hooks/data/useTagSnapshot';

import { showError } from '@/utils/notification';
import { useId, useState } from 'react';
import { getDisplayTaskDate } from '@/utils/date';
import { ERRORS_MESSAGES, NOT_FOUND_MESSAGES } from '@/consts/messages';

interface ViewTaskModalProps {
	task: Task;
	isOpen: boolean;
	onClose: () => void;
}

const ViewTaskModal = ({ task, isOpen, onClose }: ViewTaskModalProps) => {
	const titleId = useId();
	const [isOpenEdit, setIsOpenEdit] = useState(false);
	const [setDoneTask, isLoadingDone] = useSetDoneTask();
	const [tag, isLoadingTag, errorTag] = useTagSnapshot(task.tagId);

	const handleChangeDone = async (e: React.ChangeEvent<HTMLInputElement>, id: TaskId) => {
		try {
			setDoneTask(id, e.target.checked);
		} catch (error) {
			showError(ERRORS_MESSAGES.updateTask, error);
		}
	};

	return (
		<>
			<AppModal isOpen={isOpen} onClose={onClose} aria-labelledby={titleId}>
				<AppModal.Title id={titleId}>Просмотр задачи</AppModal.Title>

				<div className={cl.body}>
					<DescriptionList>
						<DescriptionList.Item label="Дата выполнения:">
							{getDisplayTaskDate(task.dueAt.seconds)}
						</DescriptionList.Item>
						<DescriptionList.Item label="Название:">{task.name}</DescriptionList.Item>
						<DescriptionList.Item label="Тег:">
							{errorTag ? (
								<ErrorMessage message={ERRORS_MESSAGES.tagLoading} error={errorTag} />
							) : (
								<>
									{task.tagId ? (
										<TagItem color={tag?.color} isLoading={isLoadingTag} isSkeleton={tag === null}>
											{tag?.name}
										</TagItem>
									) : (
										NOT_FOUND_MESSAGES.tagSet
									)}
								</>
							)}
						</DescriptionList.Item>
					</DescriptionList>

					<Checkbox
						style="through"
						label="Выполнено"
						checked={task.done}
						isLoading={isLoadingDone}
						onChange={(e) => handleChangeDone(e, task.id)}
					/>
				</div>

				<AppModal.Buttons>
					<Button style="border" isFull={true} onClick={() => setIsOpenEdit(true)}>
						Редактировать
					</Button>
				</AppModal.Buttons>
			</AppModal>

			<EditTaskModal initialData={task} isOpen={isOpenEdit} onClose={() => setIsOpenEdit(false)} />
		</>
	);
};

export default ViewTaskModal;
