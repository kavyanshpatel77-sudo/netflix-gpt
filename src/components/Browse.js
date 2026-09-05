import React from 'react';
import Header from './Header';
import useMoviesApi from '../hooks/usemoviesapi';
import Maincomponent from './maincomponent';
import Secondarycomponent from './secondarycomponent';
import { toggleGptSearch } from '../utils/GPTslice';
import Gptsearch from './Gptsearch';
import { useSelector } from 'react-redux';

const Browse = () => {
    useMoviesApi();
    const showGptSearch = useSelector((store) => store.gpt.showGptsearch);

    return (
        <div>
            <Header />
            {
                showGptSearch ?
                    <Gptsearch /> :
                    <>
                        <Maincomponent />
                        <Secondarycomponent />
                    </>
            }

        </div>
    );
};

export default Browse;
