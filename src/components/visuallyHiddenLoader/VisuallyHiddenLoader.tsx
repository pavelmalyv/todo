import classNames from 'classnames';
import cl from './VisuallyHiddenLoader.module.scss';
import { LOADING_MESSAGES } from '@/consts/messages';

interface VisuallyHiddenLoaderProps {
	isLoading: boolean;
	hiddenMessage?: string;
	children: React.ReactNode;
}

const VisuallyHiddenLoader = ({
	isLoading,
	hiddenMessage = LOADING_MESSAGES.common,
	children,
}: VisuallyHiddenLoaderProps) => {
	return (
		<>
			<span className={classNames('visually-hidden', cl.loader)} role="status">
				{isLoading && hiddenMessage}
			</span>

			{children}
		</>
	);
};

export default VisuallyHiddenLoader;
