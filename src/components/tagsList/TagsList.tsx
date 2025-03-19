import cl from './TagsList.module.scss';
import TagMarker from '../UI/tagMarker/TagMarker';
import ButtonIconText from '../UI/buttonIconText/ButtonIconText';

import { NavLink } from 'react-router';

const TagsList = () => {
	return (
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
								В частности, разбавленное изрядной долей эмпатии, рациональное мышление не оставляет
								шанса для вывода текущих активов
							</span>
						</NavLink>
					</li>
				</ul>
			</nav>

			<ButtonIconText className={cl['button']} icon="add_circle" size="small">
				Добавить тег
			</ButtonIconText>
		</div>
	);
};

export default TagsList;
