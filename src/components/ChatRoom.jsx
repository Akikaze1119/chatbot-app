import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { formatText } from '../utils/formatText.js';
import ScoreForm from './ScoreForm.jsx';

export default function ChatRoom() {
  const [error, setError] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [showScoreForm, setShowScoreForm] = useState(false);

  const formControls = useForm({
    defaultValues: {
      userText: '',
    },
    mode: 'onBlur',
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = formControls;

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
            disabled={isSubmitting}
          />
          <button className={'submit-button'} type={'submit'} disabled={isSubmitting}>
            Ask me
          </button>
          {errors && <p className='text-red-600 text-sm'>{errors.userText?.message}</p>}
        </form>
      </div>
      {error && <p>{error}</p>}
      {chatHistory.length > 1 && !showScoreForm && (
        <button
          className='submit-button'
          onClick={() => {
            setShowScoreForm(true);
          }}
          type='button'
        >
          Restart
        </button>
      )}
      {showScoreForm && (
        <ScoreForm
          setChatHistory={setChatHistory}
          setError={setError}
          formControls={formControls}
        />
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
