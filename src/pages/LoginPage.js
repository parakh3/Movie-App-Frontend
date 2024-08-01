import React, { useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import API from '../api';
import Layout from '../components/Layout';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #0a1f36;
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 600px;
`;

const Form = styled.form`
  background: #1a3d5d;
  padding: 60px;
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  color: white;
`;

const Title = styled.h2`
  margin-bottom: 20px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 4px;
  margin-top: 8px;
  font-size: 16px;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  color: #aaa;
`;

const Checkbox = styled.input`
  width: auto;
  margin-top: 0;
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 18px;

  &:hover {
    background-color: #218838;
  }
`;

const ToggleLink = styled.p`
  margin-top: 20px;
  color: #aaa;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const ErrorMessage = styled.p`
  color: #dc3545;
`;

const Login = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState('');

  const onSubmitLogin = async (data) => {
    try {
      const response = await API.post('/auth/login', data);
      if (response.data.code === 200) {
        localStorage.setItem('token', response.data.token);
        window.location.href = '/movies'; // Example redirect
      } else {
        setError('Invalid Credentials');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setError('Error logging in');
    }
  };

  const onSubmitSignup = async (data) => {
    try {
      const response = await API.post('/auth/register', data);
      console.log('Signup response:', response); // Debug log to check API response

      if (response.data.code === 200) { // Adjust based on your API response
        setIsLogin(true); // Switch to login form after successful signup
        
      } 
    } catch (error) {
      console.error('Error signing up:', error);
      setError('Error signing up'); // General error message
    }
  };

  return (
    <Layout>
      <Container>
        <FormWrapper>
          <Form onSubmit={handleSubmit(isLogin ? onSubmitLogin : onSubmitSignup)}>
            <Title>{isLogin ? 'Sign in' : 'Sign up'}</Title>
            {!isLogin && (
              <FormGroup>
                <Input
                  type="text"
                  placeholder="Name"
                  {...register('name', { required: !isLogin })}
                />
              </FormGroup>
            )}
            <FormGroup>
              <Input
                type="email"
                placeholder="Email"
                {...register('email', { required: true })}
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="password"
                placeholder="Password"
                {...register('password', { required: true })}
              />
            </FormGroup>
            <FormGroup>
              <CheckboxLabel>
                <Checkbox type="checkbox" />
                Remember me
              </CheckboxLabel>
            </FormGroup>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <Button type="submit">{isLogin ? 'Login' : 'Signup'}</Button>
            <ToggleLink onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? 'Need an account? Sign up' : 'Already have an account? Log in'}
            </ToggleLink>
          </Form>
        </FormWrapper>
      </Container>
    </Layout>
  );
};

export default Login;
