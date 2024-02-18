'use client'
import { useAuth } from '@/context/authContext'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
    const [auth] = useAuth()

    const navItemStyle = " border-b-2 border-transparent hover:border-gray-400 duration-150 ease-linear cursor-pointer hover:font-semibold"
    return (
        <div className=' w-full h-[7rem] fixed pt-[1rem] bg-white'>
            <nav className=' flex justify-between items-center h-[5rem] w-[90%] border-2 m-auto  px-5 rounded-xl shadow-lg   bg-white top-0 absolue'>
                {/* mobile btn */}
                <div className="mobile hidden">
                    <p>X</p>
                </div>

                {/* logo */}
                <div className="logo font-semibold text-[1.7rem] cursor-pointer">
                    CodeBuds
                </div>

                {/* nav items */}
                <div className="navItems">
                    <ul className=' flex gap-10'>
                        <li className={navItemStyle}> DSA</li>
                        <li className={navItemStyle}>WEB DEV</li>
                        <li className={navItemStyle}>BLOGS</li>
                    </ul>
                </div>

                {/* search bar */}
                <div>
                    <input className=' bg-gray-300 p-3 rounded-3xl text-white outline-none'
                        type="search"
                        placeholder='search'

                    />
                </div>

                {/* auth btns */}
                <div>
                    <Link href={auth && auth?.user ? (auth?.user?.role === 'admin' ? '/adminProfile' : '/userProfile') : '/login'}>
                        <p className={navItemStyle}>
                            {auth && auth?.user ? (auth?.user?.role === 'admin' ? 'Admin' : 'Profile') : 'Login'}
                        </p>
                    </Link>
                </div>
            </nav>
        </div>

    )
}

export default Navbar
