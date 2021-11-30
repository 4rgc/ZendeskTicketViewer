import './Button.css';

export type ButtonProps = {
	size?: 'square' | 'small' | 'medium' | 'large';
	kind?: 'primary' | 'secondary';
	disabled?: boolean;
	onClick?: () => void;
	children?: React.ReactChild | React.ReactChild[];
	props?: React.ComponentPropsWithoutRef<'button'>;
};

export const Button: React.FC<ButtonProps> = ({
	size = 'medium',
	kind = 'primary',
	disabled = false,
	children,
	onClick = () => {},
	props = {},
}) => {
	const { className, ...restOfProps } = props;
	const defaultClickHandler = () => {};

	let buttonClass = 'btn-base';

	switch (kind) {
		case 'primary':
			buttonClass += ' btn-prm';
			break;
		case 'secondary':
			buttonClass += ' btn-sec';
			break;
	}

	switch (size) {
		case 'square':
			buttonClass += ' btn-sq';
			break;
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

	if (disabled) {
		buttonClass += ' btn-dis';
	}

	buttonClass += className ? ` ${className}` : '';

	return (
		<button
			className={buttonClass}
			onClick={disabled ? defaultClickHandler : onClick}
			{...restOfProps}
		>
			{children}
		</button>
	);
};
