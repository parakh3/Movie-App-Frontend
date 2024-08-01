import React from 'react';
import Layout from '../components/Layout';
import MovieForm from '../components/MovieForm';
import CreateMovie from '../components/CreateMovie';


const HomePage = () => {
  return (
    <Layout>
      <h1>Welcome to the Movie Database</h1>
      {/* <MovieForm /> */}
      <CreateMovie/>
      {/* <Mo/> */}
    </Layout>
  );
};

export default HomePage;
