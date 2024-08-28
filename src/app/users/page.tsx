'use client';

import { ChangeEvent, useState } from 'react';
import { trpc } from '#shared/lib/utils/trpc';

export default function Test() {
  const getUsersQuery = trpc.users.getUsers.useQuery();
  const createUserMutation = trpc.users.createUser.useMutation();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    createUserMutation.mutate({
      username: formData.username,
      email: formData.email,
      password: formData.password,
    });
    alert('User created successfully!');
  };

  if (!getUsersQuery.data) return null;

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {getUsersQuery.data.map((user) => (
          <div key={user.id}>{user.username}</div>
        ))}
      </div>

      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '20rem',
          gap: '0.5rem',
        }}
      >
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Create User</button>
      </form>
    </>
  );
}
