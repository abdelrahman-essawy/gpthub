'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import LogoWName from '../../../../public/logo/logowname.png';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useMutation } from '@apollo/client';
import client from '../../lib/apolloClient';
import REGISTER_USER from '../../lib/mutation/registerUser';
import { userRegistration } from '../../core/types';
import NotificationMessage, {
  NotificationProps,
} from '../../components/notification';

type Errors = {
  firstName?: string;
  lastName?: string;
  username?: string;
  email?: string;
  password?: string;
};

const SignUp = () => {
  const [userInfo, setUserInfo] = useState<userRegistration>({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    birthday: '1990-01-01T00:00:00',
  });
  const [errors, setErrors] = useState<Errors>({});
  const [notification, setNotification] = useState<NotificationProps | null>(
    null,
  );
  const router = useRouter();

  const [registerUser, { loading, error }] = useMutation(REGISTER_USER, {
    client,
    onError: (error) => {
      console.error('Error registering user:', error);
      setNotification({ status: 'fail', content: error.message });
    }
  });

  const validate = () => {
    const newErrors: Errors = {};
    if (!userInfo.firstName) newErrors.firstName = 'First name is required';
    if (!userInfo.lastName) newErrors.lastName = 'Last name is required';
    if (!userInfo.username) newErrors.username = 'Username is required';
    if (!userInfo.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(userInfo.email)) {
      newErrors.email = 'Email address is invalid';
    }
    if (!userInfo.password) {
      newErrors.password = 'Password is required';
    } else if (userInfo.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) {
      setNotification({
        status: 'fail',
        content: 'Please fill in all fields correctly',
      });
      return;
    }

    try {
      const { data } = await registerUser({
        variables: {
          userInfo: {
            ...userInfo,
            birthday: new Date(userInfo.birthday).toISOString(), // Ensure birthday is formatted correctly
          },
        },
      });
      console.log('User registered successfully:', data);
      setNotification({
        status: 'success',
        content: 'User registered successfully!',
      });
      // Handle success - redirect or show success message
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <div className="flex justify-center items-center bg-backgroundGray h-screen relative">
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
          <p className="text-4xl font-bold text-center mb-8">SignUp</p>
          <div className="flex flex-col gap-2 text-gray-400 w-4/5">
            <div className="flex gap-2">
              <div className="w-1/2">
                <label htmlFor="firstName">First Name</label>
                <input
                  id="firstName"
                  type="text"
                  value={userInfo.firstName}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, firstName: e.target.value })
                  }
                  className="input input-bordered w-full bg-gray-100 border-2 py-2 text-black"
                  required
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm">{errors.firstName}</p>
                )}
              </div>
              <div className="w-1/2">
                <label htmlFor="lastName">Last Name</label>
                <input
                  id="lastName"
                  type="text"
                  value={userInfo.lastName}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, lastName: e.target.value })
                  }
                  className="input input-bordered w-full bg-gray-100 border-2 py-2 text-black"
                  required
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm">{errors.lastName}</p>
                )}
              </div>
            </div>
            <div>
              <label htmlFor="username">User Name</label>
              <input
                id="username"
                type="text"
                value={userInfo.username}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, username: e.target.value })
                }
                className="input input-bordered w-full bg-gray-100 border-2 py-2 text-black"
                required
              />
              {errors.username && (
                <p className="text-red-500 text-sm">{errors.username}</p>
              )}
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={userInfo.email}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, email: e.target.value })
                }
                className="input input-bordered w-full bg-gray-100 border-2 py-2 text-black"
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
                placeholder=""
                value={userInfo.password}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, password: e.target.value })
                }
                className="input input-bordered w-full bg-gray-100 border-2 py-2 text-black"
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
              Sign Up
            </button>
          </div>
          <div className="flex gap-2 mt-8">
            <p className="text-gray-400">Already have an account?</p>
            <Link href={'/'} className="text-gray-200">
              Login{' '}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
