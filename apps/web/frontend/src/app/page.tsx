'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import LogoWName from '../../public/logo/logowname.png';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useMutation } from '@apollo/client';
import LOGIN_USER from './lib/mutation/loginUser';
import client from './lib/apolloClient';
import NotificationMessage, {
  NotificationProps,
} from './components/notification';

type Errors = {
  email?: string;
  password?: string;
};

export default function Index() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errors, setErrors] = useState<Errors>({});
  const [notification, setNotification] = useState<NotificationProps | null>(
    null,
  );
  const router = useRouter();

  const [loginUser, { loading, error }] = useMutation(LOGIN_USER, {
    client,
    onCompleted: (data) => {
      console.log('User logged in successfully:', data);
      const { accessToken, refreshToken } = data.login;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      router.push('/pages/home');
    },
    onError: (error) => {
      console.error('Error logging in user:', error);
      setNotification({ status: 'fail', content: error.message });
    },
  });

  const validate = () => {
    const newErrors: Errors = {};
    if (!email) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      setNotification({
        status: 'fail',
        content: 'Please fill in all fields correctly.',
      });
      return;
    }

    try {
      await loginUser({
        variables: {
          credentials: {
            email,
            password,
          },
        },
      });
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className="flex justify-center items-center bg-backgroundGray h-screen">
      {notification && (
        <div className="absolute bottom-2 right-2 w-96">
          <NotificationMessage
            status={notification.status}
            content={notification.content}
          />
        </div>
      )}
      <div className="bg-backgroundGray z-10 shadow-2xl w-4/5 h-4/5 rounded-3xl shadow-amber-50/10 border-gray-800/40 border-2 overflow-hidden flex">
        {/* left side */}
        <div className="flex items-center justify-center w-1/2 h-full bg-gray-600">
          <Image src={LogoWName} alt={'RAGHUB Logo'} width={500} height={500} />
        </div>
        {/* right side */}
        <div className="relative flex flex-col w-1/2 h-full justify-center items-center text-white">
          <p className="text-4xl font-bold text-center mb-8">Login</p>
          <div className="flex flex-col gap-2 text-gray-400 w-4/5">
            <div>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`input input-bordered w-full bg-gray-100 border-2 py-2 text-black ${
                  errors.email && 'border-red-500'
                }`}
                required
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`input input-bordered w-full bg-gray-100 border-2 py-2 text-black ${
                  errors.password && 'border-red-500'
                }`}
                required
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>
            <button
              onClick={handleSubmit}
              className="bg-gray-600 p-3 rounded-xl mt-2 text-white font-medium"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>
          <div className="flex gap-2 mt-8">
            <p className="text-gray-400">Don&apos;t have an account?</p>
            <Link href="/pages/signup" className="text-gray-200">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
