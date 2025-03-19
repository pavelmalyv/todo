import cl from './TagsList.module.scss';
import TagMarker from '../UI/tagMarker/TagMarker';
import ButtonIconText from '../UI/buttonIconText/ButtonIconText';
import AddTagModal from '../Modals/addTagModal/AddTagModal';

import { NavLink } from 'react-router';
import { useState } from 'react';

const TagsList = () => {
	const [isOpenAddTag, setIsOpenAddTag] = useState(false);

	return (
		<>
			<div className={cl.tags}>
				<nav>
					<ul className={cl.list}>
						<li className={cl.item}>
							<NavLink className={cl.link} to={'/'}>
								<TagMarker color="#FF0000" />

								<span className={cl.name}>Работа</span>
							</NavLink>
						</li>
						<li className={cl.item}>
							<NavLink className={cl.link} to={'other/'}>
								<TagMarker color="#FF0000" />

								<span className={cl.name}>Личное</span>
							</NavLink>
						</li>
						<li className={cl.item}>
							<NavLink className={cl.link} to={'other/'}>
								<TagMarker color="#FF0000" />

								<span className={cl.name}>
									В частности, разбавленное изрядной долей эмпатии, рациональное мышление не
									оставляет шанса для вывода текущих активов
								</span>
							</NavLink>
						</li>
					</ul>
				</nav>

				<ButtonIconText
					className={cl['button']}
					icon="add_circle"
					size="small"
					onClick={() => setIsOpenAddTag(true)}
				>
					Добавить тег
				</ButtonIconText>
			</div>

			<AddTagModal isOpen={isOpenAddTag} onClose={() => setIsOpenAddTag(false)} />
		</>
	);
};

export default TagsList;
