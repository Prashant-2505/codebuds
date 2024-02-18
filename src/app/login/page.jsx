'use client'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '@/context/authContext';

const Login = () => {
    const formInputStyle = 'w-[80%] h-[3rem] p-4 rounded-md outline-none';
    const formInputBtnStyle = 'bg-white w-[90%] h-[3rem] hover:bg-black hover:text-white duration-200 ease-in-out';

    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Destructure 'setAuth' from 'useAuth'
    const [auth, setAuth] = useAuth();

    // Corrected the onClick handler to call 'handleForm' function
    const handleForm = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.post('/api/auth/login', { email, password }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (data.success) {
                alert(data.message);
                setAuth({
                    ...auth,
                    user: data.user,
                    token: data.token
                });
                localStorage.setItem('auth', JSON.stringify({ user: data.user, token: data.token }));
                router.push('/');
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    return (
        <div className="h-[100vh] w-full border-2 pt-[9rem] bg-white flex justify-center">
            <form className='h-[80%] w-[50%] bg-gray-400'>
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
                <div className="btn h-[30%] flex flex-col items-center justify-evenly">
                    {/* Corrected the onClick handler to call 'handleForm' function */}
                    <button onClick={handleForm} type="submit" className={formInputBtnStyle}>
                        Login
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
            </form>
        </div>
    );
};

export default Login;