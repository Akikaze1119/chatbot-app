import { useState } from 'react';

export default function UserForm({ getResponse, onShowForm }) {
  const [error, setError] = useState(null);
  const [userInfo, setUserInfo] = useState({
    name: 'Jane Doe',
    email: 'test@test.com',
    phone: '1234567890',
    postalCode: 'V1V1V1',
  });

  const handleUserInfoChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  /**
   * send user info to the server to start the chat
   */
  const startChat = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/chats', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInfo),
      });
      const data = await response.json();
      if (response.status !== 200) throw new Error(data);
      return data;
    } catch (error) {
      return { error: error.message };
    }
  };

  /**
   * handle user info form submission
   */
  const handleSubmitUserInfo = async (e) => {
    e.preventDefault();
    try {
      // 1. start the chat with the user info
      const result = await startChat();
      if (result.error) {
        setError(result.error);
      } else {
        // 2.save chatId to localStorage
        result.chat.id && localStorage.setItem('chatId', result.chat.id);

        // 3.set user info in the chat for the model to use
        let prompt = `I'm sending my info. Talk based on my info. When I ask you about location, you have to answer based on my postal code. User info: ${userInfo.name}, ${userInfo.email}, ${userInfo.phone}, ${userInfo.postalCode}`;

        // 4.get the response from the model based on the prompt and send it to the server
        await getResponse(prompt, []);

        setError(null);
        setUserInfo(null);
        onShowForm(false);
      }
    } catch (error) {
      console.error(error);
      setError('Something went wrong! Please try again later');
    }
  };

  return (
    <form onSubmit={handleSubmitUserInfo} className='flex flex-col gap-2'>
      <div>
        <label>Name: </label>
        <input
          type='text'
          name='name'
          value={userInfo.name}
          onChange={handleUserInfoChange}
          required
        />
      </div>
      <div>
        <label>Email: </label>
        <input
          type='email'
          name='email'
          value={userInfo.email}
          onChange={handleUserInfoChange}
          required
        />
      </div>
      <div>
        <label>Phone: </label>
        <input
          type='tel'
          name='phone'
          value={userInfo.phone}
          onChange={handleUserInfoChange}
          required
        />
      </div>
      <div>
        <label>Postal code: </label>
        <input
          type='text'
          name='postalCode'
          value={userInfo.postalCode}
          onChange={handleUserInfoChange}
          required
        />
      </div>
      {error && <p className='text-red-600'>{error}</p>}
      <button className={'submit-button'} type='submit'>
        Submit
      </button>
    </form>
  );
}
