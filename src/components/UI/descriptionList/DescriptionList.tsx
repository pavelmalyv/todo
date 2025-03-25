import cl from './DescriptionList.module.scss';

interface DescriptionListProps {
	children: React.ReactNode;
}

const DescriptionList = ({ children }: DescriptionListProps) => {
	return <dl className={cl.list}>{children}</dl>;
};

interface ItemProps {
	label: string;
	children: React.ReactNode;
}

const Item = ({ label, children }: ItemProps) => {
	return (
		<div className={cl.item}>
			<dt className={cl.title}>{label}</dt>
			<dd className={cl.text}>{children}</dd>
		</div>
	);
};

DescriptionList.Item = Item;

export default DescriptionList;
