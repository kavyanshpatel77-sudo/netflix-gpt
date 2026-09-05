import React from "react";
import Gptsearchbar from "./Gptsearchbar";
import Gptmoviesuggestion from "./Gptmoviesuggestioin";
import { BG_URL } from "../utils/constants";

const Gptsearch = () => {
    return (
        <div>
            <div className="fixed -z-10">
                <img className="w-screen h-screen object-cover"
                    src={BG_URL}
                    alt="background"
                />
            </div>
            <Gptsearchbar />
            <Gptmoviesuggestion />
        </div>
    );
};

export default Gptsearch;