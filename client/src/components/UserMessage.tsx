import { User } from 'lucide-react';
import { ReactNode } from 'react';

interface IUserMessageProps {
  content: string | ReactNode;
}

export default function AiMessage({ content }: IUserMessageProps) {
  return (
    <div className='flex gap-3 my-4 text-gray-800 flex-1'>
      <div className='mt-2 p-3 leading-relaxed bg-slate-200 w-full rounded-lg rounded-tr-none'>
        {content}
      </div>
      <User className={'text-white rounded-full bg-slate-500 p-1 w-8 h-8'} />
    </div>
  );
}
