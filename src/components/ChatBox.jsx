import { useState } from 'react';
import UserForm from './UserForm.jsx';
import Chat from './Chat.jsx';

export default function ChatBox() {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [showForm, setShowForm] = useState(true);

  const getResponse = async (userText, history) => {
    if (!userText) {
      setError('ERROR! Please press clear button and ask a question');
      return;
    }
    const chatId = localStorage.getItem('chatId');
    const chatIdNumber = parseInt(chatId);
    try {
      const response = await fetch('http://localhost:8000/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chatId: chatIdNumber,
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

  return (
    <div className='w-full'>
      <section className='m-4 max-w-4xl'>
        {showForm && <UserForm getResponse={getResponse} onShowForm={setShowForm} />}
        {!showForm && (
          <Chat
            getResponse={getResponse}
            chatHistory={chatHistory}
            clear={clear}
            error={error}
            value={value}
            setValue={setValue}
          />
        )}
      </section>
    </div>
  );
}
