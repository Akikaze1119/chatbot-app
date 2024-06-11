export default function UserInfoInput() {
  return (
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
  );
}
