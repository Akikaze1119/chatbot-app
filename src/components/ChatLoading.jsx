import UserMessage from './UserMessage';
import AiMessage from './AiMessage';

export default function ChatLoading({ userText }) {
  return (
    <>
      <UserMessage content={userText} />
      <AiMessage content={'Thinking...'} />
    </>
  );
}
