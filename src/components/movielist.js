import React from 'react';
import Moviecard from './moviecard';

const Movielist = ({ title, movies }) => {
    if (!movies || movies.length === 0) return null;

    return (
        <div className="px-6 md:px-12 py-4">
            <h1 className="text-xl md:text-3xl font-bold py-2 text-white">{title}</h1>
            <div className="flex overflow-x-scroll no-scrollbar py-2">
                <div className="flex">
                    {movies.map((movie) => (
                        <Moviecard 
                            key={movie.id} 
                            posterPath={movie.poster_path || movie.medium_cover_image} 
                            movie={movie} 
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Movielist;