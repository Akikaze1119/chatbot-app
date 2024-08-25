import { useState } from 'react';
import UserForm from './UserForm.jsx';
import ChatRoom from './ChatRoom.jsx';

export default function ChatBox() {
  // check if the user has already entered their information to show the chat room
  const isShowForm = localStorage.getItem('userId');
  // show the form if the user has not entered their information
  const [showForm, setShowForm] = useState(!isShowForm);

  return (
    <div className='w-full'>
      <section className='m-4 max-w-4xl'>
        {showForm && <UserForm onShowForm={setShowForm} />}
        {!showForm && <ChatRoom />}
      </section>
    </div>
  );
}
