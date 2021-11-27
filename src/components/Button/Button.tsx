import './Button.css';

export interface ButtonProps {
	size: 'small' | 'medium' | 'large';
	type: 'primary' | 'secondary';
	onClick: () => void;
}

export const Button: React.FC<ButtonProps> = ({
	size = 'medium',
	type = 'primary',
	children,
	onClick = () => {},
}) => {
	let buttonClass = 'btn-base';

	switch (type) {
		case 'primary':
			buttonClass += ' btn-prm';
			break;
		case 'secondary':
			buttonClass += ' btn-sec';
			break;
	}

	switch (size) {
		case 'small':
			buttonClass += ' btn-sm';
			break;
		case 'medium':
			buttonClass += ' btn-md';
			break;
		case 'large':
			buttonClass += ' btn-lg';
			break;
	}

	return (
		<button className={buttonClass} onClick={onClick}>
			{children}
		</button>
	);
};
