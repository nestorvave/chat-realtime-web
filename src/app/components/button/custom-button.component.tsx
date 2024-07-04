'use client';
export interface IButton {
	label: string;
	variant?: 'main' | 'white';
	icon?: React.ReactNode;
	onClick?: () => void;
	customStyles?: string;
	id: string;
	disabled?: boolean;
	isSubmit?: boolean;
}

const Button = ({
	label,
	variant = 'main',
	onClick,
	icon,
	customStyles,
	id,
	disabled = false,
	isSubmit = false,
}: IButton) => {
	let bgColor = 'bg-blue-500';
	let textColor = 'text-white';
	const borderColor = 'border-transparent';
	const spinnerColor = 'border-white';
	let hoverBgColor = 'hover:bg-blue-800';

	switch (variant) {
		case 'main':
			bgColor = 'bg-gradient-to-r from-blue-500 to-blue-900 ';
			break;
		case 'white':
			bgColor = 'bg-white ';
			textColor = 'text-logo';
			hoverBgColor = 'hover:text-main';
			break;

		default:
			break;
	}

	const defaultClasses =
		'w-full text-base px-4 py-2  px-6 rounded-3xl transition-all duration-300';
	const solidButtonClasses = `${defaultClasses} ${bgColor} ${textColor} ${borderColor} ${hoverBgColor} px-5 py-2.5 font-medium`;
	const disabledButtonClasses = `${defaultClasses} bg-gray-300 text-gray-500 border-gray-300 cursor-not-allowed pointer-events-none opacity-50 px-5 py-2.5 font-medium`;
	const buttonClasses = disabled ? disabledButtonClasses : solidButtonClasses;

	return (
		<button
			disabled={disabled}
			id={id}
			onClick={onClick}
			className={`${buttonClasses} ${
				icon && 'flex items-center justify-center gap-4'
			} ${customStyles} ${isSubmit ? 'cursor-not-allowed opacity-50' : ''}`}
		>
			<div className='space-between flex items-center justify-center gap-3'>
				{isSubmit ? (
					<>
						{'Cargando...'}
						<div
							className={`spinner h-3 w-3 animate-spin rounded-full border-t-4 ${spinnerColor}`}
						></div>
					</>
				) : (
					<>
						{icon && <span>{icon}</span>}

						{label}
					</>
				)}
			</div>
		</button>
	);
};

export default Button;
