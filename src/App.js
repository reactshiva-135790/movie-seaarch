import React, { useState, useEffect } from 'react';
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFavourites from './components/AddFavourites';
import DeleteMovie from './components/DeleteMovie';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [favourites, setFavourites] = useState([]);

  const getMovieRequest = async (searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=657b8b72`;

    const response = await fetch(url);
    const responseJson = await response.json();
    console.log(responseJson);

    if (responseJson.Search) {
      setMovies(responseJson.Search);
      console.log(responseJson.Search);
    }
  };

  useEffect(() => {
    const savedFavourites = JSON.parse(localStorage.getItem("favourites"));

    if (savedFavourites) {
      setFavourites(savedFavourites);
    }
  }, []);

  const saveLocalStorage = (items) => {
    localStorage.setItem('favourites', JSON.stringify(items));
  }

  const addFavouriteMovie = (movie) => {
    const newFavouriteList = [...favourites, movie];
    setFavourites(newFavouriteList);
    saveLocalStorage(newFavouriteList)
  };


  const removeFavouriteMovie = (movie) => {
    const valueDel = favourites.filter((favourite) => favourite.imdbID !== movie.imdbID);
    setFavourites(valueDel);
    saveLocalStorage(valueDel)
  }



  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);

  return (
    <div className='container-fluid movie-app'>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading='Movies' />
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      <div className='row'>
        <MovieList
          movies={movies}
          favouriteComponent={AddFavourites}
          handleFavouritesClick={addFavouriteMovie}
        />
      </div>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading='Favourites' />
      </div>
      <div className='row'>
        <MovieList
          movies={favourites}
          handleFavouritesClick={removeFavouriteMovie}
          favouriteComponent={DeleteMovie}
        />
      </div>
    </div>
  );
};

export default App;
