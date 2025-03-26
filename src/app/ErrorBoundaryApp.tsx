import type { FallbackProps } from 'react-error-boundary';

import ErrorScreen from '@/components/errorScreen/ErrorScreen';
import { isNotFoundError } from '@/utils/error';
import { ErrorBoundary } from 'react-error-boundary';

interface ErrorBoundaryAppProps {
	children: React.ReactNode;
}

const ErrorBoundaryApp = ({ children }: ErrorBoundaryAppProps) => {
	const fallbackRender = ({ error, resetErrorBoundary }: FallbackProps) => {
		if (isNotFoundError(error)) {
			return (
				<ErrorScreen
					title="404"
					description="Страница, которую вы ищете, не существует или была перемещена. Проверьте URL-адрес или вернитесь на главную страницу"
					isHomeButton={true}
					onClickHomeButton={() => resetErrorBoundary()}
				/>
			);
		} else {
			return (
				<ErrorScreen
					title="Ошибка"
					description="На сайте возникла критическая ошибка. Попробуйте перезагрузить страницу"
				/>
			);
		}
	};

	return <ErrorBoundary fallbackRender={fallbackRender}>{children}</ErrorBoundary>;
};

export default ErrorBoundaryApp;
