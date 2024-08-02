import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import API from '../api';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #0e2a38;
`;

const Form = styled.form`
  background: #0e2a38;
  padding: 40px;
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 70%;
`;

const Title = styled.h1`
  color: white;
  text-align: left;
  width: 100%;
  margin-bottom: 20px;
`;

const Label = styled.label`
  color: white;
  margin-bottom: 10px;
  align-self: flex-start;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: none;
  border-radius: 4px;
  background-color: #1b3a4b;
  color: white;
  &::placeholder {
    color: white;
  }
`;

const ImageUploadContainer = styled.div`
  width: 300px;
  height: 300px;
  margin-right: 40px;
  position: relative;
`;

const ImageUpload = styled.div`
  border: 2px dashed hsla(0, 0%, 100%, 1);
  border-radius: 4px;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9a9a9a;
  cursor: pointer;
  overflow: hidden;
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
`;

const CancelButton = styled(Button)`
  background-color: transparent;
  border:1px solid white;
  color: white;
`;

const SubmitButton = styled(Button)`
  background-color: #28a745;
  color: white;
  margin-left:10px;
`;

const CreateMovieContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  width: 100%;
`;

const FormContainer = styled.div`
  display: flex;
  align-items:start;
  justify-content:start;
  width:700px;
`;


const ImageUploadWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;

const FormDetails = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const CreateMovie = ({ movie }) => {
  const { register, handleSubmit, setValue, reset } = useForm({
    defaultValues: movie || { title: '', publishingYear: '', poster: null },
  });

  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('publishingYear', data.publishingYear);
      if (data.poster && data.poster.length > 0) {
        formData.append('poster', data.poster[0]);
      }

      if (movie) {
        await API.put(`/movies/${movie._id}`, formData);
      } else {
        await API.post('/movies', formData);
        navigate('/movies');
      }

      reset();
      setPreview(null);
    } catch (error) {
      console.error('Error submitting movie:', error);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setValue('poster', [file]);
    }
  };

  return (
    <Container>
        <Form onSubmit={handleSubmit(onSubmit)}>
        <CreateMovieContainer>
        <Title>Create a new movie</Title> 
          <FormContainer>
          <ImageUploadWrapper>
            <ImageUploadContainer>
              <HiddenFileInput
                type="file"
                id="poster"
                accept="image/*"
                {...register('poster')}
                onChange={handleImageUpload}
              />
              <ImageUpload
                onClick={() => document.getElementById('poster').click()}
              >
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    style={{ maxHeight: '100%', maxWidth: '100%' }}
                  />
                ) : (
                  <span>Drop an image here</span>
                )}
              </ImageUpload>
            </ImageUploadContainer>
          </ImageUploadWrapper>
          <FormDetails>
            {/* <Label>Title</Label> */}
            <Input type="text" placeholder='Title' {...register('title', { required: true })} />
            {/* <Label>Publishing Year</Label> */}
            <Input type="number" placeholder='Publishing Year' {...register('publishingYear', { required: true })} />
            <ButtonGroup>
              <CancelButton type="button" onClick={() => reset()}>
                Cancel
              </CancelButton>
              <SubmitButton type="submit">Submit</SubmitButton>
            </ButtonGroup>
          </FormDetails>
          </FormContainer>
        </CreateMovieContainer>
      </Form>
    </Container>
  );
};

export default CreateMovie;
