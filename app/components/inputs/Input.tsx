'use client';

import clsx from 'clsx';
import React from 'react';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import { BiDollar } from 'react-icons/bi';

interface InputProps {
	id: string;
	label: string;
	type?: string;
	disabled?: boolean;
	formatPrice?: boolean;
	required?: boolean;
	register: UseFormRegister<FieldValues>;
	errors: FieldErrors;
}

const Input: React.FC<InputProps> = ({
	id,
	label,
	type,
	disabled,
	formatPrice,
	required,
	register,
	errors,
}) => {
	return (
		<div className="relative w-full">
			{formatPrice && (
				<BiDollar
					size={24}
					className="absolute left-2 top-5 text-neutral-700"
				/>
			)}
			<input
				className={clsx(
					'peer w-full rounded-md border-2 bg-white p-4 pt-6 font-light outline-none transition disabled:cursor-not-allowed disabled:opacity-70',
					formatPrice ? 'pl-9' : 'pl-4',
					errors[id] ? 'border-rose-500' : 'border-neutral-300',
					errors[id] ? 'focus:border-rose-500' : 'focus:border-black'
				)}
				id={id}
				disabled={disabled}
				{...register(id, { required })}
				placeholder=" "
				type={type}
			/>
			<label
				className={clsx(
					'text-md absolute top-5 z-10 origin-[0] -translate-y-3 transform duration-150',
					'peer-placeholder-shown:scale-100',
					'peer-placeholder-shown:translate-y-0',
					'peer-focus:scale-75',
					'peer-focus:-translate-y-4',
					formatPrice ? 'left-9' : 'left-4',
					errors[id] ? 'text-rose-500' : 'text-zinc-400'
				)}
			>
				{label}
			</label>
		</div>
	);
};

export default Input;
