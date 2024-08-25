import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { formatText } from '../utils/formatText.js';

export default function ChatRoom() {
  const [error, setError] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      userText: '',
    },
    mode: 'onBlur',
  });

  const clear = () => {
    reset();
    setChatHistory([]);
  };

  /**
   * send user input to the server and get the response
   */
  const onSubmit = async (data) => {
    const userText = data.userText;
    const chatId = localStorage.getItem('chatId');
    try {
      const response = await fetch('http://localhost:8000/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chatId: chatId,
          history: chatHistory,
          content: userText,
        }),
      });

      const data = await response.json();
      setChatHistory((oldChatHistory) => [
        ...oldChatHistory,
        {
          role: 'user',
          parts: [{ text: data.message.content }],
        },
        {
          role: 'model',
          parts: [{ text: data.aiMessage.content }],
        },
      ]);
    } catch (error) {
      console.error(error);
      setError('Something went wrong! Please try again later');
    }
  };

  /**
   * restart the chat
   */
  const restartChat = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const response = await fetch('http://localhost:8000/api/chats/restart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
        }),
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
  const handleRestart = async (e) => {
    e.preventDefault();
    try {
      // 1. start the chat with the user info
      const result = await restartChat();
      if (result.error) {
        setError(result.error);
      } else {
        // 2.delete the chatId from the local storage and set the new chatId
        localStorage.removeItem('chatId');
        result.chat.id && localStorage.setItem('chatId', result.chat.id);

        clear();
      }
    } catch (error) {
      console.error(error);
      setError('Something went wrong! Please try again later');
    }
  };

  return (
    <div>
      <h2 className='text-xl'>What do you want to know?</h2>
      <div className='input-container'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            className='w-1/2 border-2 border-gray-300 p-2 rounded-lg mr-2'
            type='text'
            {...register('userText', { required: 'Enter here.' })}
            placeholder='Ask me anything...'
            // disabled={isSubmitting}
          />
          <button className={'submit-button'} type={'submit'} disabled={isSubmitting}>
            Ask me
          </button>
          {errors && <p>{errors.userText?.message}</p>}
        </form>
      </div>
      {error && <p>{error}</p>}
      {chatHistory.length > 1 && (
        <button
          className='submit-button'
          onClick={(e) => {
            handleRestart(e);
          }}
          type='submit'
        >
          Restart
        </button>
      )}
      <div className='mt-4'>
        {chatHistory.map((chatItem, _index) => (
          <div className='mb-4' key={`${chatItem.role}-${_index}`}>
            <p>{chatItem.role} :</p>
            {chatItem.role === 'model' && (
              <div className='bg-violet-100 p-4'>{formatText(chatItem.parts[0].text)}</div>
            )}
            {chatItem.role === 'user' && (
              <div className='bg-sky-100 p-4'>{formatText(chatItem.parts[0].text)}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
