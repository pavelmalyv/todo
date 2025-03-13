import classNames from 'classnames';
import cl from './Section.module.scss';

import { useId } from 'react';

interface SectionProps {
	title: string;
	titleId?: string;
	children: React.ReactNode;
}

const Section = ({ title, titleId, children }: SectionProps) => {
	const titleIdGenerated = useId();
	const titleIdSection = titleId ? titleId : titleIdGenerated;

	return (
		<section className="section" aria-labelledby={titleIdSection}>
			<div className={cl.body}>
				<h2 id={titleIdSection} className={classNames(cl.title, 'h1')}>
					{title}
				</h2>

				{children}
			</div>
		</section>
	);
};

export default Section;
