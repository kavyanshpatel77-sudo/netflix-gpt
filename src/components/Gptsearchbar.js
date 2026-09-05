import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import lang from "../utils/Language";
import model from "../utils/geminiAi";
import { addGptMovies } from "../utils/GPTslice";

const Gptsearchbar = () => {
    const langKey = useSelector((store) => store.config.lang);
    const searchText = useRef(null);
    const dispatch = useDispatch();

    const searchMovieByQuery = async (movieName) => {
        try {
            const data = await fetch(
                "https://movies-api.accel.li/api/v2/list_movies.json?query_term=" + encodeURIComponent(movieName)
            );
            const json = await data.json();
            return json.data?.movies || [];
        } catch (err) {
            console.error("Movie search fetch error for", movieName, err);
            return [];
        }
    };

    const handleSearch = async () => {
        if (!searchText.current?.value) return;

        console.log("Searching for:", searchText.current.value);

        const prompt = "Act as a movie recommendation system and suggest some movies based on the following query: "
            + searchText.current.value + ". Only give me 5 movie names only, comma separated like the example given ahead example : Sholay, Golmaal, Chupke Chupke, Padosan, Hera Pheri. Do not include numbering or extra text.";

        try {
            console.log("Calling Gemini AI...");
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const textResult = response.text();

            console.log("Gemini Movie Suggestions Text:", textResult);

            if (!textResult) return;

            const gptMovies = textResult
                .split(",")
                .map((movie) => movie.replace(/^[0-9]+\.\s*/, "").replace(/["']/g, "").trim())
                .filter((movie) => movie.length > 0);
            console.log("Parsed Movie Names:", gptMovies);

            const promiseArray = gptMovies.map((movie) => searchMovieByQuery(movie));
            const resolvedResults = await Promise.all(promiseArray);
            console.log("Fetched Movies Data:", resolvedResults);

            dispatch(addGptMovies({ movieNames: gptMovies, movieResults: resolvedResults }));

        } catch (error) {
            console.error("Gemini AI Error in handleSearch:", error);
        }
    };

    return (
        <div className="pt-24 sm:pt-[10%] px-4 flex justify-center relative z-10">
            <form className="w-full max-w-2xl bg-black grid grid-cols-1 md:grid-cols-12 rounded-lg p-2 sm:p-4" onSubmit={(e) => e.preventDefault()}>
                <input
                    ref={searchText}
                    type="text"
                    className="p-3 sm:p-4 m-1 sm:m-2 col-span-1 md:col-span-9 rounded-lg text-black bg-white min-w-0"
                    placeholder={lang[langKey].GptPlaceholder}
                />
                <button
                    type="button"
                    onClick={handleSearch}
                    className="col-span-1 md:col-span-3 m-1 sm:m-2 py-2 px-4 bg-red-700 text-white rounded-lg hover:bg-red-800 transition">
                    {lang[langKey].search}
                </button>
            </form>
        </div>
    );
};

export default Gptsearchbar;