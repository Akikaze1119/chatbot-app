import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Send, RotateCcw } from 'lucide-react';

import { formatText } from './formatText';
import { cn } from '../utils/clsx-utils';
import AiMessage from './AiMessage';
import UserMessage from './UserMessage';
import ChatLoading from './ChatLoading';
import ScoreForm from './ScoreForm';

const apiUrl = import.meta.env.VITE_API_URL;

interface ChatItem {
  role: string;
  parts: { text: string }[];
}

interface MessageData {
  message: {
    content: string;
  };
  aiMessage: {
    content: string;
  };
}

export default function ChatRoom() {
  const [error, setError] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatItem[]>([]);
  const [showScoreForm, setShowScoreForm] = useState(false);

  const formControls = useForm({
    defaultValues: {
      userText: '',
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    watch,
    reset,
  } = formControls;

  /**
   * send user input to the server and get the response
   */
  const onSubmit = async (data: { userText: string }) => {
    const userText = data.userText;
    const chatId = localStorage.getItem('chatId');
    try {
      const response = await fetch(`${apiUrl}/api/messages`, {
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

      const responseData: MessageData = await response.json();
      setChatHistory((oldChatHistory: ChatItem[]) => [
        ...oldChatHistory,
        {
          role: 'user',
          parts: [{ text: responseData.message.content }],
        },
        {
          role: 'model',
          parts: [{ text: responseData.aiMessage.content }],
        },
      ]);
      reset();
    } catch (error) {
      console.error(error);
      setError('Something went wrong! Please try again later');
    }
  };

  return (
    <div className='chat-room flex flex-col flex-1 justify-between'>
      <div className={'overflow-y-auto mx-2 '}>
        {/* default chatbot message */}
        <AiMessage content={'Hello! How can i assist you today?'} />
        {error && <AiMessage content={error} />}
        {/* Chat history */}
        <div className='mt-4'>
          {chatHistory.map((chatItem, _index) => (
            <div className='mb-4' key={`${chatItem.role}-${_index}`}>
              {chatItem.role === 'model' && (
                <AiMessage content={formatText(chatItem.parts[0].text)} />
              )}
              {chatItem.role === 'user' && (
                <UserMessage content={formatText(chatItem.parts[0].text)} />
              )}
            </div>
          ))}
        </div>
        {isSubmitting && <ChatLoading userText={watch('userText')} />}
      </div>
      {/* User text input & restart button */}
      <div className='border-t-2 border-violet-700'>
        {!showScoreForm && (
          <form onSubmit={handleSubmit(onSubmit)} className={'w-full pt-2 px-2'}>
            <textarea
              className={cn('w-full max-h-96 border-2 border-gray-300 p-2 rounded-lg', {
                'opacity-50 cursor-not-allowed': isSubmitting,
              })}
              {...register('userText', { required: 'Enter here.' })}
              placeholder='Ask me anything...'
              disabled={isSubmitting}
            ></textarea>
            <div className='flex justify-between items-center flex-1'>
              {/* restart chat */}
              <button
                className={cn(
                  'bg-slate-500 text-white py-1 w-1/3 rounded-lg flex justify-around items-center',
                  {
                    'opacity-50 cursor-not-allowed': chatHistory.length < 1,
                  }
                )}
                onClick={() => {
                  setShowScoreForm(true);
                }}
                type='button'
                disabled={chatHistory.length < 1}
              >
                <span className='block text-lg'>Restart</span>
                <RotateCcw />
              </button>

              <button
                className={cn('bg-violet-700 text-white w-14 rounded-lg mr-2', {
                  'opacity-50 cursor-not-allowed': isSubmitting || !isValid,
                })}
                type={'submit'}
                disabled={isSubmitting || !isValid}
              >
                <Send className='mx-auto py-1 h-full' />
              </button>
            </div>
            {errors && <p className='text-red-600 text-sm px-3 pt-1'>{errors.userText?.message}</p>}
          </form>
        )}
        {showScoreForm && (
          <ScoreForm
            setChatHistory={setChatHistory}
            setError={setError}
            setShowScoreForm={setShowScoreForm}
            formControls={formControls}
          />
        )}
      </div>
    </div>
  );
}
