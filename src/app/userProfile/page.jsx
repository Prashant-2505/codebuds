'use client'

import { useAuth } from '@/context/authContext'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React from 'react'
import { app } from '../../firebase'
import { getAuth, signOut } from "firebase/auth";


const UserProfile = () => {
    //firebase
    const auth = getAuth(app);


    const [userAuth, setUserAuth] = useAuth()
    const router = useRouter()

    // const handleLogout = async () => {
    //     const { data } = await axios.get('api/auth/logout')
    //     if (data.success) {
    //         setAuth(null);
    //         localStorage.removeItem('auth');
    //         alert('Logged out')
    //         router.push('/login')
    //     }
    //     console.log(data)
    // }

    const handleLogout = async () => {
        signOut(auth).then(() => {
            localStorage.removeItem('userAuth');
            setUserAuth(null)

            alert('Logged out')
            router.push('/login')
        })
            .catch((error) =>
                console.log(error))
    }

    return (
        <div className=' pt-[7rem]'>
            user profile:  {userAuth?.user?.name}
            <button onClick={() => handleLogout()}>
                logout
            </button>
        </div>
    )
}

export default UserProfile
