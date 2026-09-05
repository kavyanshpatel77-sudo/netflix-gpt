import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTrailerVideo } from "../utils/movieslice";

const useMovieTrailer = (ytTrailerCode) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const trailerKey = ytTrailerCode || "L3oOldviIgY";
        dispatch(addTrailerVideo({ key: trailerKey }));
    }, [dispatch, ytTrailerCode]);
};

export default useMovieTrailer;
