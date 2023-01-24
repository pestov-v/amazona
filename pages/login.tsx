import { FormEvent, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';
import { toast } from 'react-toastify';

import { TextInput, PasswordInput } from 'components/ui';
import { useTextInput } from 'hooks';
import { getError } from 'utils/errors';

const Login = () => {
  const { data: session } = useSession();

  console.log('Loginh Session', session);

  const router = useRouter();
  const { redirect } = router.query;

  useEffect(() => {
    if (session?.user) {
      router.push((redirect as string) || '/');
    }
  }, [session?.user, redirect, router]);

  const formData = {
    email: useTextInput({
      isRequired: true,
      filters: ['email'],
      validators: ['email'],
    }),
    password: useTextInput({
      isRequired: true,
      validators: ['password'],
    }),
  };

  const login = async (e: FormEvent) => {
    e.preventDefault();
    const { email, password } = formData;

    try {
      const res = await signIn('credentials', {
        redirect: false,
        email: email.value,
        password: password.value,
      });
      if (res.error) {
        toast.error(res.error);
      }
    } catch (e) {
      console.log('Error:', getError(e));
    }
  };

  return (
    <div className='min-w-full h-[100vh] flex justify-center items-center'>
      <form className='mx-auto w-[25rem] py-4 flex flex-col' onSubmit={login}>
        <TextInput
          {...formData.email.inputProps}
          errors={formData.email.errors}
          label='Email'
          placeholder='Enter email...'
          autoFocus
        />
        <PasswordInput
          {...formData.password.inputProps}
          errors={formData.password.errors}
          label='Password'
          placeholder='Enter password...'
        />

        <div className='flex mb-4 justify-between items-center text-sm'>
          <Link href='/forgot-password'>Forgot password</Link>
          <Link href='/register' className='text-cyan-900 font-semibold'>
            Don&apos;t have an account?
          </Link>
        </div>
        <button className='relative primary-button px-8 self-end'>Login</button>
      </form>
    </div>
  );
};

export default Login;
