import { useState } from 'react';

export default function UserForm({ getResponse, onShowForm }) {
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

  const createUser = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInfo),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmitUserInfo = async (e) => {
    e.preventDefault();
    await createUser();
    let prompt = `I'm sending my info. Talk based on my info. When I ask you about location, you have to answer based on my postal code. User info: ${userInfo.name}, ${userInfo.email}, ${userInfo.phone}, ${userInfo.postalCode}`;
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
        <label>Postal code: </label>
        <input
          type='text'
          name='postalCode'
          value={userInfo.postalCode}
          onChange={handleUserInfoChange}
          required
        />
      </div>
      <button type='submit'>Submit</button>
    </form>
  );
}
