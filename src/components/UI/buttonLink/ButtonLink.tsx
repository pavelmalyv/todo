import classNames from 'classnames';
import cl from './ButtonLink.module.scss';
import { Link } from 'react-router';

interface ButtonLinkProps {
	to: string;
	target?: string;
	isFull?: boolean;
	className?: string;
	children: React.ReactNode;
}

const ButtonLink = ({ to, target, isFull = false, className, children }: ButtonLinkProps) => {
	return (
		<Link
			to={to}
			className={classNames(cl.button, { [cl['button_full']]: isFull }, className)}
			target={target}
		>
			{children}
		</Link>
	);
};

export default ButtonLink;
