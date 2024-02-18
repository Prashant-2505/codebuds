'use client'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const Accordion = (props) => {
    const { name, questions } = props
    const [show, setShow] = useState(false)

    const variants = {
        hidden: { height: 0, opacity: 0 },
        visible: { height: 'auto', opacity: 1 },
    }

   

    return (
        <div className='h-auto py-8 px-4 rounded-md bg-gray-300'>
            <h1
                className='text-[1.3rem] font-semibold uppercase cursor-pointer '
                onClick={() => setShow(!show)}
            >
                {name}
            </h1>
            <motion.div
                className='bg-gray-200 p-2 rounded-md overflow-hidden'
                initial='hidden'
                animate={show ? 'visible' : 'hidden'}
                variants={variants}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
            >
                {questions.map((i, index) => (
                    <motion.p className='pb-8' key={index}>
                        {i}
                    </motion.p>
                ))}
            </motion.div>
        </div>
    )
}

export default Accordion
