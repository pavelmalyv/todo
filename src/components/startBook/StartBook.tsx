import classNames from 'classnames';
import cl from './StartBook.module.scss';
import ButtonLink from '../UI/buttonLink/ButtonLink';

import { LOGIN_URL } from '@/consts/routes';

interface StartBookProps {
	titleId?: string;
}

const StartBook = ({ titleId }: StartBookProps) => {
	return (
		<div className={cl.start}>
			<h1 id={titleId} className={classNames(cl.title, 'h1')}>
				ToDo
			</h1>
			<div className={cl.description}>
				<p>
					Оставайтесь организованными и успевайте всё: ваше идеальное приложение для списка дел.
				</p>
				<p>
					ToDo — это цифровой инструмент управления задачами, разработанный для помощи пользователям
					в организации и расстановке приоритетов в их повседневных делах и обязанностях.
				</p>
			</div>
			<div className={cl.button}>
				<ButtonLink to={LOGIN_URL} isFull={true}>
					Начать
				</ButtonLink>
			</div>
		</div>
	);
};

export default StartBook;
