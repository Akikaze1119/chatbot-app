import { useState } from 'react';

import ChatButton from './components/ChatButton';
import ChatBox from './components/ChatBox';

import { cn } from './utils/clsx-utils';

function App() {
  const [open, setOpen] = useState(false);

  return (
    <div className={'flex justify-center items-start '}>
      <div className={'min-h-dvh w-full h-full bg-white relative'}>
        <header className={'bg-violet-700 p-4 flex justify-center'}>
          <h1 className='text-white font-bold'>React Chat</h1>
        </header>
        <main className={'p-6'}>
          <h2>Contents</h2>
          <p>
            This is a chat application that uses a chatbot to answer questions. Click on the chat
            button to open the chat window.
          </p>
          <aside>
            <ChatButton open={open} setOpen={setOpen} />
            <div
              className={cn(
                'chat-box fixed bottom-0 right-0 sm:bottom-6 sm:right-6 w-full h-full sm:max-w-sm rounded-lg shadow-md backdrop-blur border border-violet-200 bg-white overflow-hidden transform transition-all duration-500 ease-in-out origin-bottom-right',
                {
                  'translate-y-0 opacity-100 scale-100': open,
                  'translate-y-full opacity-0 scale-95 border-none': !open,
                }
              )}
            >
              {open && <ChatBox setOpen={setOpen} />}
            </div>
          </aside>
        </main>
      </div>
    </div>
  );
}

export default App;
