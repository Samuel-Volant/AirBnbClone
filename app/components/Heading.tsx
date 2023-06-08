'use client';

import clsx from 'clsx';
import React from 'react';

interface HeadingProps {
	title: string;
	subtitle: string;
	center?: boolean;
}

const Heading: React.FC<HeadingProps> = ({ title, subtitle, center }) => {
	return (
		<div className={clsx(center ? 'text-center' : 'text-start')}>
			<div className="text-2xl font-bold">{title}</div>
			<div className="mt-2 font-light text-neutral-500">{subtitle}</div>
		</div>
	);
};

export default Heading;
