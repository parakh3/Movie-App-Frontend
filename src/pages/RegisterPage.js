import React from 'react';
import { useForm } from 'react-hook-form';
import API from '../api';
import Layout from '../components/Layout';

const RegisterPage = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await API.post('/auth/register', data);
      localStorage.setItem('token', response.data.token);
      // Redirect to movies or home page
    } catch (error) {
      console.error('Error registering:', error);
    }
  };

  return (
    <Layout>
      <h1>Register</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Email</label>
        <input type="email" {...register('email', { required: true })} />

        <label>Password</label>
        <input type="password" {...register('password', { required: true })} />

        <button type="submit">Register</button>
      </form>
    </Layout>
  );
};

export default RegisterPage;
