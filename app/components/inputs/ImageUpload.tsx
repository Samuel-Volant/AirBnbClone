'use client';

import { CldUploadWidget } from 'next-cloudinary';
import Image, { ImageProps } from 'next/image';
import { useCallback } from 'react';
import { TbPhotoPlus } from 'react-icons/tb';

declare global {
	var cloudinary: any;
}

interface ImageUploadProps {
	onChange: (value: string) => void;
	value: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value }) => {
	const handleUpload = useCallback(
		(result: any) => {
			onChange(result.info.secure_url);
		},
		[onChange]
	);
	return (
		<CldUploadWidget
			onUpload={handleUpload}
			uploadPreset="mkecisit"
			options={{ maxFiles: 1 }}
		>
			{({ open }) => {
				return (
					<div
						onClick={() => open?.()}
						className="trnasition order-neutral-300 jsutify-center relative flex cursor-pointer flex-col items-center gap-4 border-2 border-dashed p-20 text-neutral-600 hover:opacity-70"
					>
						<TbPhotoPlus size={50} />
						<div className="text-lg font-semibold">Click to Upload</div>
						{value && (
							<div className="absolute inset-0 h-full w-full">
								<Image
									alt="Upload"
									fill
									style={{ objectFit: 'cover' }}
									src={value}
								/>
							</div>
						)}
					</div>
				);
			}}
		</CldUploadWidget>
	);
};

export default ImageUpload;
