import React from 'react';
import Movielist from './movielist';
import { useSelector } from 'react-redux';

const Secondarycomponent = () => {
    const movies = useSelector((store) => store.movies?.nowPlayingMovies);

    if (!movies || movies.length === 0) return null;

    // 1. Now Playing: Original fetched order
    const nowPlaying = movies;

    // 2. Popular Movies: Sorted by highest rating
    const popularMovies = [...movies].sort((a, b) => (b.rating || 0) - (a.rating || 0));

    // 3. Trending Movies: Reversed order
    const trendingMovies = [...movies].reverse();

    // 4. Upcoming Movies: Sliced offset order
    const upcomingMovies = movies.slice(4).concat(movies.slice(0, 4));

    return (
        <div className="bg-black w-full">
            <div className="mt-0 md:-mt-52 pl-4 md:pl-12 relative z-20 space-y-4">
                <Movielist title={"Now Playing"} movies={nowPlaying} />
                <Movielist title={"Popular Movies"} movies={popularMovies} />
                <Movielist title={"Trending"} movies={trendingMovies} />
                <Movielist title={"Upcoming Movies"} movies={upcomingMovies} />
            </div>
        </div>
    );
};

export default Secondarycomponent;
