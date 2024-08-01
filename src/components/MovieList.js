import React, { useEffect, useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate(); // Hook for navigation
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const  data  = await API.get('/movies');
        console.log("data is",data)
        setMovies(data.data);
      } catch (error) {
        console.error('Error fetching movies:', error);
        navigate('/login');
      }
    };

    fetchMovies();
  }, []);

  return (
    <div>
      <h1>Movie List</h1>
      <ul>
        {movies.map((movie) => (
          <li key={movie._id}>
            <h2>{movie.title}</h2>
            <p>{movie.publishingYear}</p>
            <img src={`https://movie-app-backend-vbs8.onrender.com/uploads/${movie.poster}`} alt={movie.title} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
