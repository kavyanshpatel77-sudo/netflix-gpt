import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { adduser, removeUser } from '../utils/Userslice';
import { toggleGptSearch } from '../utils/GPTslice';
import { Supported_languages } from '../utils/constants';
import { changeLanguage } from '../utils/configSlice';

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const showGptSearch = useSelector((store) => store.gpt?.showGptsearch);
    const user = useSelector((store) => store.user);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const { uid, email, displayName, photoURL } = user;
                dispatch(adduser({ uid: uid, email: email, displayName: displayName, photoURL: photoURL }));
                navigate("/browse");
            } else {
                dispatch(removeUser());
                navigate("/");
            }
        });

        return () => unsubscribe();
    }, [dispatch, navigate]);

    const handlesignout = () => {
        signOut(auth)
            .then(() => {
                navigate("/")
            })
            .catch((error) => {
                navigate("/error")
            });
    }

    const handleGPTclick = () => {
        dispatch(toggleGptSearch())
    }

    const handleLanguageChange = (e) => {
        dispatch(changeLanguage(e.target.value));
    };

    return (
        <div className='absolute w-full px-4 md:px-8 py-2 bg-gradient-to-b from-black z-20 flex justify-between items-center gap-2'>
            <img className='w-28 sm:w-36 md:w-44 flex-shrink-0' alt="logo" src="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production_2026-05-14/consent/87b6a5c0-0104-4e96-a291-092c11350111/019ae4b5-d8fb-7693-90ba-7a61d24a8837/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png" />

            {user && <div className='flex min-w-0 p-0 md:p-2 items-center justify-end gap-1 sm:gap-2 md:gap-3'>
                {showGptSearch && (
                    <select 
                        className="max-w-20 sm:max-w-none bg-black text-white p-1 sm:p-2 text-xs sm:text-sm rounded border border-gray-600 cursor-pointer"
                        onChange={handleLanguageChange}
                    >
                        {Supported_languages.map(lang => (
                            <option key={lang.identifier} value={lang.identifier}>{lang.name}</option>
                        ))}
                    </select>
                )}
                <img className='w-8 h-8 sm:w-10 sm:h-10 rounded mr-0 sm:mr-2 flex-shrink-0' src={user?.photoURL} alt='avatar' />
                <button className='text-white text-xs sm:text-sm font-bold bg-green-600 px-2 sm:px-4 py-2 rounded hover:bg-green-700 transition whitespace-nowrap'
                    onClick={handleGPTclick}>
                    {showGptSearch ? "Homepage" : "GPTSearch"}
                </button>
                <button className='text-white text-xs sm:text-sm font-bold bg-red-600 px-2 sm:px-4 py-2 rounded hover:bg-red-700 transition whitespace-nowrap'
                    onClick={handlesignout}>
                    Sign out
                </button>
            </div>}
        </div>
    )
}

export default Header;