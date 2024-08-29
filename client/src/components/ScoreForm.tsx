import { UseFormReturn, useForm } from 'react-hook-form';
import { Undo2, Send } from 'lucide-react';

import RadioGroupRating from './ScoreRadioInput';
import { cn } from '../utils/clsx-utils';

const apiUrl = import.meta.env.VITE_API_URL;

interface IRadioGroupRatingProps {
  formControls: UseFormReturn<{ userText: string }>;
  setChatHistory: (value: any) => void;
  setError: (value: any) => void;
  setShowScoreForm: (value: any) => void;
}

export default function ScoreForm({
  setChatHistory,
  setError,
  setShowScoreForm,
  formControls,
}: IRadioGroupRatingProps) {
  const { reset } = formControls;

  const scoreFormControls = useForm({
    defaultValues: {
      score: 3,
    },
    mode: 'onBlur',
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = scoreFormControls;

  /**
   * restart the chat
   */
  const restartChat = async (score: number) => {
    try {
      const userId = localStorage.getItem('userId');
      const chatId = localStorage.getItem('chatId');
      const response = await fetch(`${apiUrl}/api/chats/restart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
          chatId: chatId,
          score: score,
        }),
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
  const onSubmit = async (data: { score: number }) => {
    const score = data.score;
    try {
      // 1. start the chat with the user info
      const result = await restartChat(score);
      if (result.error) {
        setError(result.error);
      } else {
        // 2.delete the chatId from the local storage and set the new chatId
        localStorage.removeItem('chatId');
        result.chat.id && localStorage.setItem('chatId', result.chat.id);

        reset();
        setChatHistory([]);
        setShowScoreForm(false);
      }
    } catch (error) {
      console.error(error);
      setError('Something went wrong! Please try again later');
    }
  };

  return (
    <div className={'px-4'}>
      <p className={'font-semibold pt-2'}>How would you rate the support?</p>
      <form className={'flex justify-between items-center h-16'} onSubmit={handleSubmit(onSubmit)}>
        <div className={'flex items-center gap-3'}>
          <RadioGroupRating formControls={scoreFormControls} />
          <button
            className={cn(
              'bg-violet-700 text-white w-full py-1 px-2 rounded-lg mr-2 flex justify-between items-center',
              {
                'opacity-50 cursor-not-allowed': isSubmitting,
              }
            )}
            type='submit'
            disabled={isSubmitting}
          >
            <span className='block w-full'>Send</span>
            <Send />
          </button>
        </div>
        <button
          className={'p-1 bg-slate-500 text-white rounded-lg h-fit'}
          type='button'
          onClick={() => {
            setShowScoreForm(false);
          }}
        >
          <Undo2 />
        </button>
      </form>
    </div>
  );
}
