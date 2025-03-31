export type BaseFieldProps = Omit<React.ComponentProps<'input'>, 'className'> & {
	label: string;
	isSkeleton?: boolean;
	isLoading?: boolean;
	errorMessage?: string;
};
