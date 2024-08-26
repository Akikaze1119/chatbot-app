import RadioGroupRating from './ScoreRadioInput.jsx';
import { useForm } from 'react-hook-form';

export default function ScoreForm({ setChatHistory, setError, formControls }) {
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
  const restartChat = async (score) => {
    try {
      const userId = localStorage.getItem('userId');
      const chatId = localStorage.getItem('chatId');
      const response = await fetch('http://localhost:8000/api/chats/restart', {
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
      return { error: error.message };
    }
  };

  /**
   * handle user info form submission
   */
  const onSubmit = async (data) => {
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
      }
    } catch (error) {
      console.error(error);
      setError('Something went wrong! Please try again later');
    }
  };

  return (
    <form className='flex gap-3' onSubmit={handleSubmit(onSubmit)}>
      <RadioGroupRating formControls={scoreFormControls} />
      <button className='submit-button' type='submit' disabled={isSubmitting}>
        Submit
      </button>
    </form>
  );
}
