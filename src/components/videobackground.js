import React from 'react';
import { useSelector } from 'react-redux';
import useMovieTrailer from '../hooks/useMovieTrailer';

const Videobackground = ({ movieId, ytTrailerCode }) => {
    useMovieTrailer(ytTrailerCode);
    const trailerVideo = useSelector((store) => store.movies?.trailerVideo);

    const trailerKey = trailerVideo?.key || ytTrailerCode || "L3oOldviIgY";

    return (
        <div className="w-screen aspect-video bg-black overflow-hidden pointer-events-none">
            <iframe
                className="w-screen aspect-video scale-125 md:scale-135"
                src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=${trailerKey}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            ></iframe>
        </div>
    );
};

export default Videobackground;