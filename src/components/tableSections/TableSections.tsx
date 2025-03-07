import classNames from 'classnames';
import cl from './TableSections.module.scss';

interface TableSectionsProps {
	children: React.ReactNode;
}

const TableSections = ({ children }: TableSectionsProps) => {
	return <div className={classNames(cl.table, 'section')}>{children}</div>;
};

export default TableSections;
