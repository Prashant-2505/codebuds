'use client'

// Import necessary modules and styles
import { useRouter } from "next/navigation";
import leetcode from '../../public/images/leetcode.png'
import web from '../../public/images/web.jpg'
import Image from "next/image";
import { AiOutlineLike } from "react-icons/ai";

import amazon from '../../public/images/amazon.png'
import { Button } from "@nextui-org/react";



export default function Home() {


  const router = useRouter();

  return (
    <main className="pt-[10rem] w-full h-full p-8">


      <h1>
        Welcome to <span className="font-semibold">CodeBud</span> - Your Ultimate Resource for DSA Patterns, Web Development, and Insightful Blogs! Explore a curated list of questions designed to enhance your understanding of Data Structures and Algorithms, delve into the latest trends in web development, and stay informed with our thought-provoking blogs. Let the journey towards mastering coding and staying updated on industry insights begin!
      </h1>

      <div className="mt-[3rem]  h-[400px] w-full flex gap-10 ">

        {/* dsa  */}
        <div onClick={() => router.push('/dsa')}
          className="dsa w-[50%] h-full  relative group duration-200 ease-in-out transition-opacity cursor-pointer">
          <div
            className=" h-full w-full flex flex-col gap-10 justify-center items-center shadow-lg shadow-gray-500 rounded-md ">
            <h1 className=" font-semibold text-[3rem]">Data Structure </h1>
            <h1 className=" font-semibold text-[3rem]">And algorithm</h1>
          </div>

          <div className="img absolute top-0 h-full w-full shadow-lg shadow-gray-500 rounded-md group-hover:opacity-0 transition-opacity duration-200 ease-in-out">
            <Image className="h-full w-full rounded-md " src={leetcode} />
          </div>

        </div>

        {/* web */}
        <div onClick={() => router.push('/web')}
          className="web w-[50%] h-full  relative group duration-200 ease-in-out transition-opacity cursor-pointer">
          <div
            className=" h-full w-full flex flex-col gap-10 justify-center items-center shadow-lg shadow-gray-500 rounded-md ">
            <h1 className=" font-semibold text-[3rem]">Web</h1>
            <h1 className=" font-semibold text-[3rem]"> Development</h1>
          </div>

          <div className="img absolute top-0 h-full w-full shadow-lg shadow-gray-500 rounded-md group-hover:opacity-0 transition-opacity duration-200 ease-in-out">
            <Image className="h-full w-full rounded-md " src={web} />
          </div>

        </div>
      </div>

      {/* top most question */}
      <div className="mt-[8rem] text-center hfull w-full">
        <h1 className=" font-semibold text-2xl">Top Most Liked Question</h1>

        <div className=" text-left">
          <div className='bg-gray-200 my-8 p-6 flex justify-between items-center rounded-md mx-4 shadow-lg shadow-slate-400'>
            <div className="">
              <h1 className='font-bold text-3xl mb-3'>questionName</h1>
              <h2 className='font-semibold text-xl mb-2'>questionDescription</h2>
              <a href="ooo" target="_blank" rel="noopener noreferrer" className='text-lg cursor-pointer'>
                Link
              </a>
            </div>
            <div className=" flex flex-col justify-center items-center">
              <AiOutlineLike
                className={`text-5xl hover:bg-blue-400 p-2 rounded-full transition duration-200 ease-soft-spring hover:cursor-pointer `} />
              <p>like</p>
            </div>
          </div>
        </div>
      </div>

      {/* company wise question */}
      <div className=" mt-[8rem] text-center  p-4 rounded-md bg-slate-100 shadow-md">
        <h1 className=" font-semibold text-2xl ">Company wise question</h1>
        <div className="grid grid-cols-4 gap-[8rem] mt-8">

          <div className="flex flex-col-reverse justify-center items-center border-2 p-2 rounded-md group shadow-lg hover:shadow-orange-300 cursor-pointer duration-200 ease-linear bg-white">

            <Image className="h-[4rem] w-[4rem] "
              src={amazon} />
          </div>

          <div className="flex flex-col-reverse justify-center items-center border-2 p-2 rounded-md group shadow-lg hover:shadow-orange-300 cursor-pointer duration-200 ease-linear bg-white">

            <Image className="h-[4rem] w-[4rem] "
              src={amazon} />
          </div>

          <div className="flex flex-col-reverse justify-center items-center border-2 p-2 rounded-md group shadow-lg hover:shadow-orange-300 cursor-pointer duration-200 ease-linear bg-white">

            <Image className="h-[4rem] w-[4rem] "
              src={amazon} />


          </div>

          <div className="flex flex-col-reverse justify-center items-center border-2 p-2 rounded-md group shadow-lg hover:shadow-orange-300 cursor-pointer duration-200 ease-linear bg-white">

            <Image className="h-[4rem] w-[4rem] "
              src={amazon} />
          </div>

          <div className="flex flex-col-reverse justify-center items-center border-2 p-2 rounded-md group shadow-lg hover:shadow-orange-300 cursor-pointer duration-200 ease-linear bg-white">

            <Image className="h-[4rem] w-[4rem] "
              src={amazon} />
          </div>

        </div>
      </div>
    </main>
  );
}

