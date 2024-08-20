import { useState } from 'react';

import ChatBox from './components/ChatBox.jsx';
import ChatButton from './components/ChatButton.jsx';

function App() {
  const [open, setOpen] = useState(true);
  return (
    <div className={'flex justify-center items-start min-h-dvh bg-indigo-200'}>
      <div className={'max-w-screen-sm min-h-dvh w-full h-full bg-white relative'}>
        {/* <header className={'bg-indigo-600 p-4 flex justify-center'}>
          <h1 className='text-white font-bold'>React Chat</h1>
        </header> */}
        <main className={'p-6'}>
          {/* <h2>Contents</h2>
          <p>
            This is a chat application that uses a chatbot to answer questions. Click on the chat
            button to open the chat window.
          </p> */}
          <aside>
            <ChatButton open={open} setOpen={setOpen} />
            {open && <ChatBox />}
          </aside>
        </main>
      </div>
    </div>
  );
}

export default App;
