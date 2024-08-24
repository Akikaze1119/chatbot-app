import { useState } from 'react';
import { formatText } from '../utils/formatText.js';

export default function ChatRoom({}) {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const sendMessage = async (userText, history) => {
    if (!userText) {
      setError('ERROR! Please press clear button and ask a question');
      return;
    }
    const chatId = localStorage.getItem('chatId');
    try {
      const response = await fetch('http://localhost:8000/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chatId: chatId,
          history: history,
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
      setValue('');
    } catch (error) {
      console.error(error);
      setError('Something went wrong! Please try again later');
    }
  };

  const clear = () => {
    setValue('');
    setError('');
    setChatHistory([]);
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
        <input
          className='w-1/2 border-2 border-gray-300 p-2 rounded-lg mr-2'
          value={value}
          placeholder='Ask me anything...'
          onChange={(e) => setValue(e.target.value)}
        />
        {!error && (
          <button className={'submit-button'} onClick={() => sendMessage(value, chatHistory)}>
            Ask me
          </button>
        )}
        {error && (
          <button className={'submit-button'} onClick={clear} type='button'>
            Clear
          </button>
        )}
      </div>
      {error && <p>error {error}</p>}
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
    </div>
  );
}
