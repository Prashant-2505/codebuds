'use client'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useAuth } from '@/context/authContext';
import { app } from '../../firebase'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import GoogleAuth from '@/components/GoogleAuth';

const Login = () => {
    const formInputStyle = 'w-[80%] h-[3rem] p-4 rounded-md outline-none';
    const formInputBtnStyle = 'bg-white w-[90%] h-[3rem] hover:bg-black hover:text-white duration-200 ease-in-out rounded-md mb-2';

    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [userAuth, setUserAuth] = useAuth();


    // firebase
    const auth = getAuth(app)


    // const handleForm = async (e) => {
    //     e.preventDefault();

    //     try {
    //         const { data } = await axios.post('/api/auth/login', { email, password }, {
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //         });
    //         if (data.success) {
    //             alert(data.message);
    //             setUserAuth({
    //                 ...userAuth,
    //                 user: data.user,
    //                 token: data.token
    //             });
    //             localStorage.setItem('userAuth', JSON.stringify({ user: data.user, token: data.token }));
    //             router.push('/');
    //         } else {
    //             alert(data.message);
    //         }
    //     } catch (error) {
    //         console.error('Login error:', error);
    //     }
    // };

    const handleForm = async (e) => {
        e.preventDefault();

        try {
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    alert("login succesfull")

                    setUserAuth({
                        ...userAuth,
                        user: { name: user.displayName, email: user.email },

                    });
                    localStorage.setItem('userAuth', JSON.stringify({
                        user: { name: user.displayName, email: user.email },

                    }));
                    router.push('/');
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    alert(errorMessage)
                });

        } catch (error) {
            console.error('Login error:', error);
        }
    };

    return (
        <div className="h-[100vh] w-full border-2 pt-[9rem] bg-white flex justify-center  ">
            <div className=' h-[80%] w-[50%] flex flex-col items-center bg-gray-400 py-2'>
                <form className=' w-[100%] h-[60%]  '>
                    <div className="flex flex-col w-full h-[70%] items-center justify-evenly">
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={formInputStyle}
                            type="text" placeholder='Enter email'
                        />
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={formInputStyle}
                            type="password" placeholder='Enter password'
                        />
                    </div>

                </form>
                <div className="btn h-[40%] w-[90%] flex flex-col items-center justify-evenly">
                    {/* Corrected the onClick handler to call 'handleForm' function */}
                    <button onClick={handleForm} type="submit" className={formInputBtnStyle}>
                        Login
                    </button>
                    <button
                        className={formInputBtnStyle}
                    >
                        <GoogleAuth />
                    </button>
                    <div className='flex w-full justify-between px-8'>
                        <p className='font-semibold'>Don't have an account?</p>
                        <button
                            onClick={() => router.push('/register')}
                            className='border-b-2 border-transparent hover:border-b-2 hover:border-black '
                        >
                            Register
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;