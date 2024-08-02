import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import API from '../api';
import EditMovie from './EditMovie'; // Import EditMovie component
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import { FaPlus, FaSignOutAlt } from 'react-icons/fa'; // Import icons for add and logout

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #0d3b66;
  min-height: 100vh;
  color: white;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px; /* Adjust as needed */
  margin-bottom: 20px;
  align-items: center; /* Center align items vertically */
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 1.75rem;
  margin: 0;
  display: flex;
  align-items: center;
  font-weight: 400; /* Regular weight */
`;

const AddMoviesButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 2rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-left: 10px;

  &:hover {
    color: #aaa; /* Lighter color on hover */
  }
`;

const LogoutButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1rem;
  display: flex;
  align-items: center;
  cursor: pointer;

  &:hover {
    color: #aaa; /* Lighter color on hover */
  }
`;

const MoviesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  width: 100%;
  max-width: 1200px; /* Adjust as needed */
`;

const MovieCard = styled.div`
  background-color: #005f73;
  border-radius: 10px;
  overflow: hidden;
  text-align: center;
  padding: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Add shadow for a floating effect */
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-5px); /* Lift the card slightly on hover */
  }
`;

const MovieImage = styled.img`
  width: 100%;
  height: 300px; /* Fixed height for a consistent layout */
  object-fit: cover; /* Cover to maintain aspect ratio and crop if necessary */
  border-radius: 10px; /* Optional: Add rounded corners */
`;

const MovieTitle = styled.h2`
  font-size: 1.2rem;
  margin: 10px 0;
`;

const MovieYear = styled.p`
  font-size: 1rem;
  margin-bottom: 10px;
`;

const Pagination = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const PageButton = styled.button`
  background-color: ${(props) => (props.active ? '#28a745' : '#005f73')}; /* Green for active, blue for others */
  border: none;
  padding: 10px 15px;
  color: white;
  cursor: pointer;
  border-radius: 5px;
  font-size: 1rem;
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    background-color: ${(props) => (props.active ? '#218838' : '#004a58')}; /* Darker on hover */
  }

  &:disabled {
    cursor: not-allowed;
  }

  &.active {
    background-color: #28a745; /* Green for active page */
    font-weight: bold;
    transform: scale(1.1); /* Slightly enlarge the active button */
  }
`;

const EditButton = styled.button`
  background-color: #28a745; /* Green color */
  border: none;
  padding: 10px 20px;
  color: white;
  cursor: pointer;
  border-radius: 5px;
  font-size: 1rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: #218838; /* Darker green on hover */
  }

  &:disabled {
    background-color: #aaa;
    cursor: not-allowed;
  }
`;

const MyMovies = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [moviesPerPage] = useState(10);
  const [editingMovie, setEditingMovie] = useState(null);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    fetchMovies();
  }, [currentPage]);

  const fetchMovies = async () => {
    try {
      const { data } = await API.get(`/movies?page=${currentPage}&limit=${moviesPerPage}`);
      if (data.movies) {
        setMovies(data.movies);
        setTotalPages(Math.ceil(data.total / moviesPerPage));
      } else {
        setMovies(data);
        setTotalPages(1);
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
      setMovies([]);
      navigate('/login');
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleEditClick = (movie) => {
    setEditingMovie(movie);
  };

  const handleCancelEdit = () => {
    setEditingMovie(null);
  };

  const handleSaveEdit = () => {
    fetchMovies(); // Refetch movies to show the updated list
  };

  const handleLogout = () => {
    // Clear user session data
    localStorage.removeItem('token'); // Adjust according to your storage method
    // Redirect to login page or home page
    navigate('/login'); // Adjust route as needed
  };

  return (
    <Container>
      <Header>
        <TitleContainer>
          <Title>My Movies</Title>
          <AddMoviesButton onClick={() => navigate('/add-movies')}>
            + 
          </AddMoviesButton>
        </TitleContainer>
        <LogoutButton onClick={handleLogout}>
          Logout <FaSignOutAlt style={{ marginLeft: '5px' }} />
        </LogoutButton>
      </Header>
      {editingMovie ? (
        <EditMovie
          movie={editingMovie}
          onCancel={handleCancelEdit}
          onSave={handleSaveEdit}
        />
      ) : (
        <>
          <MoviesGrid>
            {movies.map((movie) => (
              <MovieCard key={movie._id}>
                <MovieImage
                  src={`https://movie-app-backend-vbs8.onrender.com/uploads/${movie.poster}?t=${new Date().getTime()}`}
                  alt={movie.title}
                />
                <MovieTitle>{movie.title}</MovieTitle>
                <MovieYear>{movie.publishingYear}</MovieYear>
                <EditButton onClick={() => handleEditClick(movie)}>Edit</EditButton>
              </MovieCard>
            ))}
          </MoviesGrid>
          <Pagination>
            <PageButton onClick={handlePrevPage} disabled={currentPage === 1}>
              Prev
            </PageButton>
            {[...Array(totalPages).keys()].map((page) => (
              <PageButton
                key={page + 1}
                onClick={() => handlePageChange(page + 1)}
                disabled={currentPage === page + 1}
                active={currentPage === page + 1}
                className={currentPage === page + 1 ? 'active' : ''}
              >
                {page + 1}
              </PageButton>
            ))}
            <PageButton onClick={handleNextPage} disabled={currentPage === totalPages}>
              Next
            </PageButton>
          </Pagination>
        </>
      )}
    </Container>
  );
};

export default MyMovies;
