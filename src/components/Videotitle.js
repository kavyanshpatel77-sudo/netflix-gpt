import React from 'react'

const Videotitle = ({ title, overview }) => {
    return (
        <div className="w-screen aspect-video pt-[15%] md:pt-[18%] px-6 md:px-16 absolute text-white bg-gradient-to-r from-black via-black/50 to-transparent z-10">
            <h1 className="text-3xl md:text-6xl font-extrabold tracking-wide drop-shadow-lg max-w-xl">
                {title}
            </h1>
            <p className="hidden md:inline-block py-6 text-base md:text-lg w-2/5 text-gray-200 drop-shadow line-clamp-4">
                {overview}
            </p>
            <div className="my-4 md:my-0 flex items-center gap-3">
                <button className="bg-white text-black py-2 md:py-3 px-6 md:px-8 text-base md:text-xl rounded font-bold hover:bg-opacity-80 transition duration-200 flex items-center justify-center gap-2 shadow-md">
                    <span>▶</span> Play
                </button>
                <button className="bg-[rgba(109,109,110,0.7)] text-white py-2 md:py-3 px-6 md:px-8 text-base md:text-xl rounded font-bold hover:bg-opacity-50 transition duration-200 flex items-center justify-center gap-2 shadow-md">
                    <span>ⓘ</span> More Info
                </button>
            </div>
        </div>
    )
}

export default Videotitle;