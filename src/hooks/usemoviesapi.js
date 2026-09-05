import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NOW_PLAYING_MOVIES_URL } from '../utils/constants';
import { addNowPlayingMovies } from '../utils/movieslice';

const useMoviesApi = () => {
    const dispatch = useDispatch();
    const movies = useSelector((store) => store.movies?.nowPlayingMovies);

    useEffect(() => {
        if (movies?.length) return;

        const getMovies = async () => {
            try {
                const response = await fetch(NOW_PLAYING_MOVIES_URL);
                const json = await response.json();
                const moviesList = json?.data?.movies;
                console.log("Fetched Movies from Alternate API:", moviesList);
                if (moviesList) {
                    dispatch(addNowPlayingMovies(moviesList));
                }
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        };

        getMovies();
    }, [dispatch, movies]);
};

export default useMoviesApi;
