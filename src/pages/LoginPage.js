// import React from 'react';
// import { useForm } from 'react-hook-form';
// import API from '../api';
// import Layout from '../components/Layout';

// const LoginPage = () => {
//   const { register, handleSubmit } = useForm();

//   const onSubmit = async (data) => {
//     try {
//       const response = await API.post('/auth/login', data);
//       localStorage.setItem('token', response.data.token);
//       // Redirect to movies or home page
//     } catch (error) {
//       console.error('Error logging in:', error);
//     }
//   };

//   return (
//     <Layout>
//       <h1>Login</h1>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <label>Email</label>
//         <input type="email" {...register('email', { required: true })} />

//         <label>Password</label>
//         <input type="password" {...register('password', { required: true })} />

//         <button type="submit">Login</button>
//       </form>
//     </Layout>
//   );
// };

// export default LoginPage;




import React, { useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import API from '../api';
import Layout from '../components/Layout';

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #0a1f36;
`;

const LoginForm = styled.form`
  background: #1a3d5d;
  padding: 60px;
  width: 400px;
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

const Login = () => {
  const { register, handleSubmit } = useForm();
  const [credentials,setCredentials]=useState(false);

  const onSubmit = async (data) => {
    try {
      const response = await API.post('/auth/login', data);
      console.log("checking response",response)
      if(response.data.code==200){
          localStorage.setItem('token', response.data.token);
          window.location.href = '/movies'; // Example redirect
          setCredentials(false)
      }
      else{
        setCredentials(true)
      }
      // Redirect to movies or home page
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <Layout>
      <LoginContainer>
        <LoginForm onSubmit={handleSubmit(onSubmit)}>
          <Title>Sign in</Title>
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
            <div>
                {credentials?<p>Invalid Credentials</p>:''};
            </div>
          </FormGroup>
          <Button type="submit">Login</Button>
        </LoginForm>
      </LoginContainer>
    </Layout>
  );
};

export default Login;
