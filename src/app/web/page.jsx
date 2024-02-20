import React from 'react'
import Web from './Web'

export const metadata = {
    title: "Web development",
    description: "articles or tutorials on web development",
  };

const page = () => {
    return (
        <div className='pt-[7rem]'>
            <Web />
        </div>
    )
}

export default page
