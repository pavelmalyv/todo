import cl from './MessageInfo.module.scss';

interface MessageInfoProps {
	message: string;
}

const MessageInfo = ({ message }: MessageInfoProps) => {
	return <div className={cl.message}>{message}</div>;
};

export default MessageInfo;
