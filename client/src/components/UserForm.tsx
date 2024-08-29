import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Send } from 'lucide-react';

import { cn } from '../utils/clsx-utils';

import AiMessage from './AiMessage';

const apiUrl = import.meta.env.VITE_API_URL;

interface IUserFormProps {
  onShowForm: (show: boolean) => void;
}

export interface IUser {
  name: string;
  email: string;
  phone: string;
  postalCode: string;
}

export default function UserForm({ onShowForm }: IUserFormProps) {
  const [error, setError] = useState<null | string>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      postalCode: '',
    },
    mode: 'onBlur',
  });

  /**
   * send user info to the server to start the chat
   */
  const startChat = async (data: Omit<IUser, 'id'>) => {
    const userInfo = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      postalCode: data.postalCode,
    };
    try {
      const response = await fetch(`${apiUrl}/api/chats`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInfo),
      });
      const data = await response.json();
      if (response.status !== 200) throw new Error(data);
      return data;
    } catch (error) {
      if (error instanceof Error) {
        return { error: error.message };
      }
    }
  };

  /**
   * handle user info form submission
   */
  const onSubmit = async (data: Omit<IUser, 'id'>) => {
    try {
      // 1. start the chat with the user info
      const result = await startChat(data);
      if (result.error) {
        setError(result.error);
      } else {
        // 2.save chatId to localStorage
        result.chat.id && localStorage.setItem('chatId', result.chat.id);
        result.user.id && localStorage.setItem('userId', result.user.id);

        // 3. clear the form and show the chat room
        onShowForm(false);
      }
    } catch (error) {
      console.error(error);
      setError('Something went wrong! Please try again later');
    }
  };

  return (
    <div className='chat-room overflow-y-auto mx-4'>
      <AiMessage content={'Tell me about yourself'} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='user-form flex flex-col justify-between gap-8 mx-2'
      >
        <div className='flex flex-col gap-2 flex-1'>
          <div className='flex flex-col gap-2'>
            <label className='font-semibold'>Name</label>
            <input
              className={'p-2 border border-gray-300 rounded-md'}
              type='text'
              {...register('name', { required: 'This is required.' })}
              placeholder='Full Name'
            />
          </div>
          {errors && <p className='text-red-600 text-sm'>{errors.name?.message}</p>}
          <div className='flex flex-col gap-2'>
            <label className='font-semibold'>Email</label>
            <input
              className={'p-2 border border-gray-300 rounded-md'}
              type='email'
              {...register('email', {
                required: 'This is required.',
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: 'Entered value does not match email format',
                },
              })}
              placeholder='example@example.com'
            />
            {errors && <p className='text-red-600 text-sm'>{errors.email?.message}</p>}
          </div>
          <div className='flex flex-col gap-2'>
            <label className='font-semibold'>Phone number</label>
            <input
              type='tel'
              {...register('phone', {
                required: 'This is required.',
                maxLength: { value: 10, message: 'Max length is 10. Enter without "-" or space' },
                minLength: { value: 10, message: 'Min length is 10. Enter without "-" or space' },
              })}
              placeholder='0000000000'
              className='w-1/3 min-w-32 p-2 border border-gray-300 rounded-md'
            />
            {errors && <p className='text-red-600 text-sm'>{errors.phone?.message}</p>}
          </div>
          <div className='flex flex-col gap-2'>
            <label className='font-semibold'>Zip Code</label>
            <input
              type='text'
              {...register('postalCode', {
                required: 'This is required.',
                maxLength: { value: 6, message: 'Max length is 6. Enter without "-" or space' },
                minLength: { value: 6, message: 'Min length is 6. Enter without "-" or space' },
              })}
              placeholder='ABC123'
              className='w-1/3 min-w-32 p-2 border border-gray-300 rounded-md'
            />
            {errors && <p className='text-red-600 text-sm'>{errors.postalCode?.message}</p>}
          </div>
          {error && <p className='text-red-600 text-sm'>{error}</p>}
        </div>
        <button
          className={cn(
            'bg-violet-700 py-3 px-4 w-5/6 max-w-80 text-white font-semibold rounded-lg flex justify-between items-center mx-auto',
            {
              'opacity-50 cursor-not-allowed': isSubmitting,
            }
          )}
          type='submit'
          disabled={isSubmitting}
        >
          <span className='block w-full text-lg'>Send</span>
          <Send />
        </button>
      </form>
    </div>
  );
}
