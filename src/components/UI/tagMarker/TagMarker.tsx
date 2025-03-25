import cl from './TagMarker.module.scss';

interface TagMarkerProps {
	color?: string;
}

const TagMarker = ({ color }: TagMarkerProps) => {
	return <div style={{ backgroundColor: color }} className={cl.marker}></div>;
};

export default TagMarker;
