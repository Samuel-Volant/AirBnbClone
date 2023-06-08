import clsx from 'clsx';
import React from 'react';
import { IconType } from 'react-icons';

interface CategoryInputProp {
	icon: IconType;
	label: string;
	selected?: boolean;
	onClick: (value: string) => void;
}

const CategoryInput: React.FC<CategoryInputProp> = ({
	icon: Icon,
	label,
	selected,
	onClick,
}) => {
	return (
		<div
			onClick={() => onClick(label)}
			className={clsx(
				'flex cursor-pointer flex-col gap-3 rounded-xl border-2 p-4 transition hover:border-black',
				selected ? 'border-black' : 'border-neutral-200'
			)}
		>
			<Icon size={30} />
			<div className="font-semibold">{label}</div>
		</div>
	);
};

export default CategoryInput;
