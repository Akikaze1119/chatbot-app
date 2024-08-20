import { BotMessageSquare } from 'lucide-react';

export default function ChatButton({ open, setOpen }) {
  return (
    <button
      className={
        'w-14 h-14 rounded-full bg-indigo-800 flex justify-center items-center fixed bottom-4 right-4 md:bottom-10 md:right-20'
      }
      onClick={() => setOpen(!open)}
    >
      <BotMessageSquare className={'text-white'} />
    </button>
  );
}
