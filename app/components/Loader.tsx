'use client';

import React from 'react';
import { PuffLoader } from 'react-spinners';

type Props = {};

const Loader = (props: Props) => {
	return (
		<div className="flex h-[70vh] flex-col items-center justify-center">
			<PuffLoader
				size={100}
				color="red"
			/>
		</div>
	);
};

export default Loader;
