import { BotMessageSquare } from 'lucide-react';

interface IChatButtonProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function ChatButton({ open, setOpen }: IChatButtonProps) {
  return (
    <>
      {!open && (
        <button
          className={
            'w-14 h-14 rounded-full bg-violet-700 flex justify-center items-center fixed bottom-4 right-4 sm:bottom-6 sm:right-6'
          }
          onClick={() => setOpen(true)}
        >
          <BotMessageSquare className={'text-white'} />
        </button>
      )}
    </>
  );
}
