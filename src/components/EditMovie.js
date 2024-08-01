// src/components/EditMovie.js
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import API from '../api';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #0e2a38;
`;

const Form = styled.form`
  background: #132f3f;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  color: white;
  text-align: center;
`;

const Label = styled.label`
  color: white;
  margin-top: 20px;
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
`;

const ImageUploadContainer = styled.div`
  width: 100%;
  margin-bottom: 20px;
  position: relative;
`;

const ImageUpload = styled.div`
  border: 2px dashed #4d4d4d;
  border-radius: 4px;
  height: 200px;
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
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const CancelButton = styled(Button)`
  background-color: #333;
  color: white;
`;

const SubmitButton = styled(Button)`
  background-color: #28a745;
  color: white;
`;

const EditMovie = ({ movie, onCancel, onSave }) => {
  const { register, handleSubmit, setValue, reset } = useForm({
    defaultValues: movie || { title: '', publishingYear: '', poster: null },
  });

  const [preview, setPreview] = useState('');

  useEffect(() => {
    if (movie?.poster) {
      setPreview(`https://movie-app-backend-vbs8.onrender.com/uploads/${movie.poster}?t=${new Date().getTime()}`);
    }
  }, [movie]);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('publishingYear', data.publishingYear);
      if (data.poster && data.poster.length > 0) {
        formData.append('poster', data.poster[0]);
      }

      await API.put(`/movies/${movie._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      reset();
      setPreview('');
      onSave(); // Notify parent component to refetch movie list
      onCancel(); // Close edit form
    } catch (error) {
      console.error('Error updating movie:', error);
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
        <Title>Edit Movie</Title>
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
              <span>Drop an image here or click to select</span>
            )}
          </ImageUpload>
        </ImageUploadContainer>
        <Label>Title</Label>
        <Input type="text" {...register('title', { required: true })} />
        <Label>Publishing Year</Label>
        <Input type="number" {...register('publishingYear', { required: true })} />
        <ButtonGroup>
          <CancelButton type="button" onClick={onCancel}>
            Cancel
          </CancelButton>
          <SubmitButton type="submit">Save</SubmitButton>
        </ButtonGroup>
      </Form>
    </Container>
  );
};

export default EditMovie;
