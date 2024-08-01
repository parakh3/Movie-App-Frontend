import React from 'react';
import { useForm } from 'react-hook-form';
import API from '../api';

const MovieForm = ({ movie }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: movie || { title: '', publishingYear: '', poster: null },
  });

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('publishingYear', data.publishingYear);
      if (data.poster[0]) {
        formData.append('poster', data.poster[0]);
      }

      if (movie) {
        await API.put(`/movies/${movie._id}`, formData);
      } else {
        await API.post('/movies', formData);
      }

      // Redirect or refresh the page
    } catch (error) {
      console.error('Error submitting movie:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Title</label>
      <input type="text" {...register('title', { required: true })} />

      <label>Publishing Year</label>
      <input type="number" {...register('publishingYear', { required: true })} />

      <label>Poster</label>
      <input type="file" {...register('poster')} />

      <button type="submit">Submit</button>
    </form>
  );
};

export default MovieForm;
