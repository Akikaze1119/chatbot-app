import { formatText } from '../utils/formatText.js';

export default function Chat({ getResponse, chatHistory, clear, error, value, setValue }) {
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
          <button
            className={'submit-button'}
            onClick={() => getResponse(value, chatHistory)}
            disabled={chatHistory.length < 2 && true}
          >
            Ask me
          </button>
        )}
        {error && (
          <button className={'submit-button'} onClick={clear}>
            Clear
          </button>
        )}
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
  );
}
