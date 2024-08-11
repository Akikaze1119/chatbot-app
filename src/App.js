import { useState } from 'react';
import UserForm from './form.jsx';
import { formatText } from './utils/formatText.js';

function App() {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [showForm, setShowForm] = useState(true);

  const getResponse = async (userText, history) => {
    if (!userText) {
      setError('ERROR! Please press clear button and ask a question');
      return;
    }
    try {
      const options = {
        method: 'POST',
        body: JSON.stringify({
          history: history,
          message: userText,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const response = await fetch('http://localhost:8000/gemini', options);
      const data = await response.text();
      console.log('Gemini res data:', data);
      setChatHistory((oldChatHistory) => [
        ...oldChatHistory,
        {
          role: 'user',
          parts: [{ text: userText }],
        },
        {
          role: 'model',
          parts: [{ text: data }],
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
                <button
                  onClick={() => getResponse(value, chatHistory)}
                  disabled={chatHistory.length < 2 && true}
                >
                  Ask me
                </button>
              )}
              {error && <button onClick={clear}>Clear</button>}
            </div>
            {error && <p>error {error}</p>}
            <div className='mt-4'>
              {chatHistory.slice(2).map((chatItem, _index) => (
                <div className='mb-4' key={_index + 2}>
                  <p>{chatItem.role} :</p>
                  {chatItem.role === 'model' && (
                    <p className='bg-violet-100 p-4'>{formatText(chatItem.parts[0].text)}</p>
                  )}
                  {chatItem.role === 'user' && (
                    <p className='bg-sky-100 p-4'>{formatText(chatItem.parts[0].text)}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default App;
