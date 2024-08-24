import { useState } from 'react';
import UserForm from './UserForm.jsx';
import ChatRoom from './ChatRoom.jsx';

export default function ChatBox() {
  // TODO: change the state to show the form
  const [showForm, setShowForm] = useState(true);

  return (
    <div className='w-full'>
      <section className='m-4 max-w-4xl'>
        {showForm && <UserForm onShowForm={setShowForm} />}
        {!showForm && <ChatRoom />}
      </section>
    </div>
  );
}
