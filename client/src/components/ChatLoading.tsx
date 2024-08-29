import UserMessage from './UserMessage';
import AiMessage from './AiMessage';

interface IChatLoadingProps {
  userText: string;
}

export default function ChatLoading({ userText }: IChatLoadingProps) {
  return (
    <>
      <UserMessage content={userText} />
      <AiMessage content={'Thinking...'} />
    </>
  );
}
