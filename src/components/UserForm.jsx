import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function UserForm({ onShowForm }) {
  const [error, setError] = useState(null);

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
  const startChat = async (data) => {
    const userInfo = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      postalCode: data.postalCode,
    };
    try {
      const response = await fetch('http://localhost:8000/api/chats', {
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
      return { error: error.message };
    }
  };

  /**
   * handle user info form submission
   */
  const onSubmit = async (data) => {
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
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2'>
      <div>
        <input
          type='text'
          {...register('name', { required: 'This is required.' })}
          placeholder='Full Name'
        />
        {errors && <p className='text-red-600 text-sm'>{errors.name?.message}</p>}
      </div>
      <div>
        <input
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
      <div>
        <input
          type='tel'
          {...register('phone', {
            required: 'This is required.',
            maxLength: { value: 10, message: 'Max length is 10. Enter without "-" or space' },
            minLength: { value: 10, message: 'Min length is 10. Enter without "-" or space' },
          })}
          placeholder='Phone Number'
        />
        {errors && <p className='text-red-600 text-sm'>{errors.phone?.message}</p>}
      </div>
      <div>
        <input
          type='text'
          {...register('postalCode', {
            required: 'This is required.',
            maxLength: { value: 6, message: 'Max length is 6. Enter without "-" or space' },
            minLength: { value: 6, message: 'Min length is 6. Enter without "-" or space' },
          })}
          placeholder='Postal Code'
        />
        {errors && <p className='text-red-600 text-sm'>{errors.postalCode?.message}</p>}
      </div>
      {error && <p className='text-red-600 text-sm'>{error}</p>}
      <button className={'submit-button'} type='submit' disabled={isSubmitting}>
        Submit
      </button>
    </form>
  );
}
