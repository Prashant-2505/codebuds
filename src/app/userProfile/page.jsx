'use client'

import { useAuth } from '@/context/authContext'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React from 'react'

const UserProfile = () => {

    const [auth, setAuth] = useAuth()
    const router = useRouter()

    const handleLogout = async () => {
        const { data } = await axios.get('api/auth/logout')
        if (data.success) {
            setAuth(null);
            localStorage.removeItem('auth');
            alert('Logged out')
            router.push('/login')
        }
        console.log(data)
    }
    return (
        <div className=' pt-[7rem]'>
            user profile
            <button onClick={() => handleLogout()}>
                logout
            </button>
        </div>
    )
}

export default UserProfile
