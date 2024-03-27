'use client';

import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import {
  FieldValues,
  SubmitHandler,
  useForm
} from "react-hook-form";
import toast from "react-hot-toast";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import Button from "../Button";
import Heading from "../Heading";
import Input from "../inputs/Input";
import Modal from "./Modal";

const LoginModal = () => {
  const router = useRouter();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, }
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: '',
    }
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    signIn('credentials', {...data, redirect: false})
      .then((callback) => {
        setIsLoading(false);

        if(callback?.ok) {
          toast.success('Logged in');
          router.refresh();
          loginModal.onClose();
        }

        if(callback?.error) {
          toast.error(callback.error);
        }
      })
  }

  const toggleModal = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal]);

  const bodyContent = (
    <section className="
      flex
      flex-col
      gap-4
    ">
      <Heading
        title="Welcome to BookIt"
        subtitle="Log in to your account"
      />
      <Input
        id="email"
        label="Email"
        type="email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </section>
  );

  const footerContent = (
    <section className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => signIn('google')}
      />
      <Button
        outline
        label="Continue with GitHub"
        icon={AiFillGithub}
        onClick={() => signIn('github')}
      />
      <div className="
      text-neutral-500
        text-center
        mt-4
        font-light
      ">
        <div className="justify-center flex flex-row items-center gap-2">
          <span>First time using BookIT?</span>
          <span
            onClick={toggleModal}
            className="
              text-neutral-800
              font-bold
              cursor-pointer
              hover:underline
            "
          >Create an account</span>
        </div>
      </div>
    </section>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Log in"
      actionLabel="Continue"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
}
 
export default LoginModal;