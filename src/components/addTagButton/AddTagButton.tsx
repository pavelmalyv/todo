import type { Tags } from '@/types/tags';

import ButtonIconText from '../UI/buttonIconText/ButtonIconText';
import AddTagModal from '../Modals/addTagModal/AddTagModal';

import { useState } from 'react';
import { LIMIT_TAGS } from '@/consts/docLimits';

interface AddTagButtonProps {
	tags: Tags | null;
	className?: string;
}

const AddTagButton = ({ tags, className }: AddTagButtonProps) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			{tags && tags.length < LIMIT_TAGS && (
				<ButtonIconText
					className={className}
					icon="add_circle"
					size="small"
					onClick={() => setIsOpen(true)}
				>
					Добавить тег
				</ButtonIconText>
			)}

			<AddTagModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
		</>
	);
};

export default AddTagButton;
