import classNames from 'classnames';
import cl from './StartBook.module.scss';
import Button from '../UI/button/Button';

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

			<Button type="link" to={LOGIN_URL} className={cl.button} isFull={true}>
				Начать
			</Button>
		</div>
	);
};

export default StartBook;
