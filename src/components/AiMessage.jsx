import { BotMessageSquare } from 'lucide-react';

export default function AiMessage({ content }) {
  return (
    <div className='flex gap-3 my-4 text-gray-800 flex-1'>
      <BotMessageSquare className={'text-white rounded-full bg-violet-500 p-1 w-8 h-8'} />
      <div className='mt-2 p-3 leading-relaxed bg-violet-200 w-full rounded-lg rounded-tl-none'>
        <p>{content}</p>
      </div>
    </div>
  );
}
