import React from 'react';
import Layout from '../components/Layout';
import MovieList from '../components/MovieList';
import MyMovies from '../components/MyMovies';

const MoviePage = () => {
  return (
    <Layout>
      {/* <MovieList /> */}
      <MyMovies/>
    </Layout>
  );
};

export default MoviePage;
