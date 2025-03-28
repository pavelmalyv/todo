import classNames from 'classnames';
import cl from './Section.module.scss';

import { useId } from 'react';

interface SectionProps {
	title: string;
	children: React.ReactNode;
}

const Section = ({ title, children }: SectionProps) => {
	const titleId = useId();

	return (
		<section className="section" aria-labelledby={titleId}>
			<div className={cl.body}>
				<h2 id={titleId} className={classNames(cl.title, 'h2')}>
					{title}
				</h2>

				{children}
			</div>
		</section>
	);
};

export default Section;
