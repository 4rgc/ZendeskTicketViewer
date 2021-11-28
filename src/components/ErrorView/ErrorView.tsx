import { ReactComponent as ErrorIcon } from '../../assets/error.svg';
import { ReactComponent as WarningIcon } from '../../assets/warning.svg';
import './ErrorView.css';

export type ErrorViewProps = {
	type: 'warning' | 'error';
	message: string;
};

export const ErrorView: React.FC<ErrorViewProps> = ({ type, message }) => {
	let errorViewClass = '';
	let Icon;
	switch (type) {
		case 'error':
			errorViewClass = 'error-view-error';
			Icon = <ErrorIcon fill="red" height="20px" width="20px" />;
			break;
		case 'warning':
			errorViewClass = 'error-view-warning';
			Icon = <WarningIcon fill="orange" height="20px" width="20px" />;
			break;
	}

	return (
		<div className={errorViewClass}>
			{Icon}
			<div className="error-view-message">{message}</div>
		</div>
	);
};
