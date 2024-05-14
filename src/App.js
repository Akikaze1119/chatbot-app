import { useState } from 'react';

function App() {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  console.log('chatHistory:', chatHistory);

  const surpriseOptions = [
    'Who won the latest Novel Peace Prize?',
    'Where is the nearest McDonalds?',
    'What is the capital of France?',
  ];

  const surprise = () => {
    const randomIndex = Math.floor(Math.random() * surpriseOptions.length);
    setValue(surpriseOptions[randomIndex]);
  };

  const getResponse = async () => {
    if (!value) {
      setError('ERROR! Please press clear button and ask a question');
      return;
    }
    try {
      const options = {
        method: 'POST',
        body: JSON.stringify({
          history: chatHistory,
          message: value,
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
          parts: [{ text: value }],
        },
        {
          role: 'model',
          parts: [{ text: data }],
        },
      ]);
      setValue('');
      console.log('chatHistory:', chatHistory);
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
    <div className='app'>
      <section>
        <p>
          What do you want to know?
          <button className='surprise' onClick={surprise} disabled={!chatHistory}>
            Surprise me!
          </button>
        </p>
        <div className='input-container'>
          <input
            value={value}
            placeholder='Ask me anything...'
            onChange={(e) => setValue(e.target.value)}
          />
          {!error && <button onClick={getResponse}>Ask me</button>}
          {error && <button onClick={clear}>Clear</button>}
        </div>
        {error && <p>error {error}</p>}
        <div className='search-result'>
          {chatHistory.map((chatItem, _index) => (
            <div key={_index}>
              <p className='answer'>
                {chatItem.role} : {chatItem.parts[0].text}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;
