export type BaseFieldProps = Omit<React.ComponentProps<'input'>, 'className'> & {
	label: string;
	isSkeleton?: boolean;
	isLoading?: boolean;
	errorMessage?: string;
};

export type BaseButton = {
	isLoading?: boolean;
	isSkeleton?: boolean;
	isLoadingSkeleton?: boolean;
} & (
	| ({ to?: never } & Omit<React.ComponentProps<'button'>, 'className'>)
	| ({ to: string; disabled?: never; type?: never } & Omit<React.ComponentProps<'a'>, 'className'>)
);
