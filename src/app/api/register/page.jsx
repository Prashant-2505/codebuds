'use client'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const formInputStyle = 'w-[80%] h-[3rem] p-4 rounded-md outline-none';
    const formInputBtnStyle = 'bg-white w-[90%] h-[3rem] hover:bg-black hover:text-white duration-200 ease-in-out';

    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const handleForm = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.post('/api/auth/register', { email, password, name }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
           if(data.success) {
            router.push('/')
           }

        } catch (error) {
            console.error('Register error:', error);
        }
    };

    return (
        <div className="h-[100vh] w-full border-2 pt-[9rem] bg-white flex justify-center">
            <form className='h-[80%] w-[50%] bg-gray-400' >
                <div className="flex flex-col w-full h-[70%] items-center justify-evenly">
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={formInputStyle}
                        type="text" placeholder='Enter Name'
                    />
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
                    <button
                        onClick={() => handleForm}
                        type="submit" className={formInputBtnStyle}>Register</button>
                    <div className='flex w-full justify-between px-8'>
                        <p className='font-semibold'>Already have an account?</p>
                        <button
                            onClick={() => router.push('/login')}
                            className='border-b-2 border-transparent hover:border-b-2 hover:border-black '
                        >
                            Login
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Register;
