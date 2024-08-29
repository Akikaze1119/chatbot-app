import { useState } from 'react';
import { ChevronDown, BotMessageSquare } from 'lucide-react';
import UserForm from './UserForm';
import ChatRoom from './ChatRoom';

interface IChatBoxProps {
  setOpen: (open: boolean) => void;
}

export default function ChatBox({ setOpen }: IChatBoxProps) {
  // check if the user has already entered their information to show the chat room
  const isShowForm = localStorage.getItem('userId');
  // show the form if the user has not entered their information
  const [showForm, setShowForm] = useState(!isShowForm);

  return (
    <>
      <header className={'bg-violet-600 h-14 flex justify-between items-center'}>
        <div className='flex gap-2 pl-2'>
          <BotMessageSquare
            className={'text-white rounded-full bg-violet-500 p-1 w-8 h-8 border-2 border-white'}
          />
          <h2 className='text-2xl font-bold text-white'>Support chat</h2>
        </div>
        <button
          onClick={() => {
            setOpen(false);
          }}
          className={`text-slate-800 p-2`}
        >
          <ChevronDown className={'text-white w-8 h-8'} />
        </button>
      </header>
      <section className='max-w-4xl h-full'>
        {showForm && <UserForm onShowForm={setShowForm} />}
        {!showForm && <ChatRoom />}
      </section>
    </>
  );
}
