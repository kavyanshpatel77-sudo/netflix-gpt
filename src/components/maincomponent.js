import React from 'react'
import { useSelector } from 'react-redux'
import Videotitle from './Videotitle'
import Videobackground from './videobackground'

const Maincomponent = () => {
  const movies = useSelector(store => store.movies?.nowPlayingMovies);

  if (!movies || movies.length === 0) return null;

  const mainmovie = movies[0];
  const { title, summary, yt_trailer_code, id } = mainmovie;

  return (
    <div className="relative bg-black overflow-x-hidden">
      <Videotitle title={title || "Movie Title"} overview={summary || "Movie Overview"} />
      <Videobackground movieId={id} ytTrailerCode={yt_trailer_code} />
    </div>
  )
}

export default Maincomponent;
