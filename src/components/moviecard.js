import React from 'react';
import { IMG_CDN_URL } from '../utils/constants';

const Moviecard = ({ posterPath, movie }) => {
    const rawPoster = posterPath || movie?.poster_path || movie?.medium_cover_image || movie?.large_cover_image;

    if (!rawPoster) return null;

    const imgUrl = rawPoster.startsWith("http") ? rawPoster : IMG_CDN_URL + rawPoster;

    return (
        <div className="w-36 md:w-48 pr-4 flex-shrink-0 transition duration-300 hover:scale-105 cursor-pointer">
            {imgUrl && (
                <img
                    alt="Movie Card"
                    src={imgUrl}
                    className="rounded-md shadow-lg w-full object-cover"
                />
            )}
        </div>
    )
}
export default Moviecard;