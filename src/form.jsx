import { useState } from 'react';

export default function UserForm({ getResponse, onShowForm }) {
  const [userInfo, setUserInfo] = useState({
    name: 'Jane Doe',
    email: 'test@test.com',
    phone: '1234567890',
    postcode: 'V1V 1V1',
  });

  const handleUserInfoChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleSubmitUserInfo = (e) => {
    e.preventDefault();
    let prompt = `I'm sending my info. Talk based on my info. When I ask you about location, you have to answer based on my postal code. User info: ${userInfo.name}, ${userInfo.email}, ${userInfo.phone}, ${userInfo.postcode}`;
    getResponse(prompt, []);
    onShowForm(false);
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
        <label>Postcode: </label>
        <input
          type='text'
          name='postcode'
          value={userInfo.postcode}
          onChange={handleUserInfoChange}
          required
        />
      </div>
      <button type='submit'>Submit</button>
    </form>
  );
}
