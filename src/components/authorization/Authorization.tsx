import cl from './Authorization.module.scss';
import classNames from 'classnames';
import SmallForm from '@/components/Forms/smallForm/SmallForm';
import { Link } from 'react-router';

interface AuthorizationProps {
	titleId?: string;
}

const Authorization = ({ titleId }: AuthorizationProps) => {
	return (
		<div className={cl.authorization}>
			<div className={cl.registration}>
				<h1 id={titleId} className={classNames('h1', cl.title)}>
					Вход
				</h1>
				<SmallForm aria-labelledby={titleId} buttonName="Войти"></SmallForm>
				Нет аккаунта?{' '}
				<Link to={'#'} className="link">
					Зарегистрироваться
				</Link>
			</div>
		</div>
	);
};

export default Authorization;
