import './Button.css';

export type ButtonProps = {
	size?: 'small' | 'medium' | 'large';
	kind?: 'primary' | 'secondary';
	onClick?: () => void;
	children: React.ReactChild | React.ReactChild[];
	props: React.ComponentPropsWithoutRef<'button'>;
};

export const Button: React.FC<ButtonProps> = ({
	size = 'medium',
	kind = 'primary',
	children,
	onClick = () => {},
	props,
}) => {
	const { className, ...restOfProps } = props;

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

	buttonClass += className && ` ${className}`;

	return (
		<button className={buttonClass} onClick={onClick} {...restOfProps}>
			{children}
		</button>
	);
};
