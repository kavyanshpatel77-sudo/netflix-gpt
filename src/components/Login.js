import React, { useRef, useState } from 'react'
import Header from './Header'
import { validateform } from '../utils/valoidateform'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { adduser } from '../utils/Userslice';
import { USER_AVATAR, BG_URL } from '../utils/constants';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [isSignin, setIsSignin] = useState(true);
    const tooglesignin = () => {
        setIsSignin(!isSignin)
    }

    const name = useRef(null);
    const email = useRef(null);
    const password = useRef(null);

    const [errorMessage, setErrorMessage] = useState(null);

    const handleButtonclick = () => {
        console.log(email.current.value)
        console.log(password.current.value)
        const message = validateform(email.current.value, password.current.value)
        setErrorMessage(message)

        if (message) return;
        if (!isSignin) {
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    const user = userCredential.user;
                    updateProfile(user, {
                        displayName: name.current.value,
                        photoURL: USER_AVATAR
                    })
                        .then(() => {
                            // Header.js mein onAuthStateChanged automatically Redux store update aur navigate kar dega
                            const { uid, email, displayName, photoURL } = auth.currentUser;
                            dispatch(adduser({ uid: uid, email: email, displayName: displayName, photoURL: photoURL }));
                        }).catch((error) => {
                            setErrorMessage(error.message);
                        });
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + " " + errorMessage);
                });

        } else {
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    // Signed in successfully
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + " " + errorMessage);
                });
        }
    }
    return (
        <div>
            <Header />
            <div className="absolute top-0 left-0 w-screen h-screen -z-10">
                <img
                    className="w-full h-full object-cover"
                    src={BG_URL}
                    alt='background'
                />
            </div>
            <form
                onSubmit={(e) => e.preventDefault()}
                className='w-11/12 sm:w-8/12 md:w-5/12 lg:w-3/12 absolute px-6 sm:px-10 md:px-12 pb-8 sm:pb-12 pt-8 bg-black my-24 sm:my-36 mx-auto right-0 left-0 text-white bg-opacity-80 rounded-lg'>
                <h1
                    className='text-3xl font-bold mb-6'>
                    {isSignin ? "Sign In" : "Sign up"}
                </h1>
                {
                    !isSignin && (
                        <input
                            ref={name} type="text"
                            placeholder='Name'
                            className='px-2 py-2 my-2 w-full bg-white text-black'
                        />
                    )
                }
                <input
                    ref={email}
                    type="text" placeholder='Email'
                    className='px-2 py-2 my-2 w-full bg-white text-black'
                />
                <input ref={password}
                    type="password" placeholder='password'
                    className='px-2 py-2 my-2 w-full bg-white text-black'
                />
                <p
                    className='text-red-500 font-bold'>{errorMessage}
                </p>
                <button
                    onClick={handleButtonclick}
                    className='px-2 py-2 mt-1 w-full bg-red-700 rounded-lg'>
                    {isSignin ? "Sign In" : "Sign up"}
                </button>
                <p
                    className='py-6 text-gray-400'
                    onClick={tooglesignin} >
                    {isSignin ? "New to Netflix? Sign up now" : "Already have account? Sign In"}
                </p>
            </form>
        </div>

    )
}

export default Login   