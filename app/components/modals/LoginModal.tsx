'use client';

import axios from 'axios';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { useCallback, useState } from 'react';
import {
	FieldValues,
	RegisterOptions,
	SubmitHandler,
	UseFormRegisterReturn,
	useForm,
} from 'react-hook-form';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import toast from 'react-hot-toast';
import Button from '../Button';
import { signIn } from 'next-auth/react';
import { sign } from 'crypto';
import { useRouter } from 'next/navigation';

const LoginModal = () => {
	const registerModal = useRegisterModal();
	const loginModal = useLoginModal();
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FieldValues>({
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const toggle = useCallback(() => {
		loginModal.onClose();
		registerModal.onOpen();
	}, [loginModal, registerModal]);

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		setIsLoading(true);
		signIn('credentials', {
			...data,
			redirect: false,
		}).then((callback) => {
			setIsLoading(false);
			if (callback?.ok) {
				toast.success('Logged In');
				router.refresh();
				loginModal.onClose();
			}
			if (callback?.error) {
				toast.error(callback.error);
			}
		});
	};

	const bodyContent = (
		<div className="flex flex-col gap-4">
			<Heading
				title={'Welcome back !'}
				subtitle={'Login to your account'}
			/>
			<Input
				id={'email'}
				label={'Email'}
				register={register}
				errors={errors}
				required
			/>
			<Input
				id={'password'}
				label={'Password'}
				type="Password"
				register={register}
				errors={errors}
				required
			/>
		</div>
	);

	const FooterContent = (
		<div className="mt-3 flex flex-col gap-4">
			<hr />
			<Button
				outline
				label="Continue with Google"
				icon={FcGoogle}
				onClick={() => signIn('google')}
			/>
			<Button
				outline
				label="Continue with Github"
				icon={AiFillGithub}
				onClick={() => signIn('github')}
			/>
			<div className="mt-4 text-center font-light text-neutral-500">
				<div className="flex flex-row items-center justify-center gap-2">
					<div>First time using AirBnb ?</div>
					<div
						className="cursor-pointer text-neutral-800 hover:underline"
						onClick={toggle}
					>
						Create an account
					</div>
				</div>
			</div>
		</div>
	);

	return (
		<Modal
			disabled={isLoading}
			isOpen={loginModal.isOpen}
			title="Login"
			actionLabel="Continue"
			onClose={loginModal.onClose}
			onSubmit={handleSubmit(onSubmit)}
			body={bodyContent}
			footer={FooterContent}
		/>
	);
};

export default LoginModal;
