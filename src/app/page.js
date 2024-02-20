'use client'

// Import necessary modules and styles
import { useRouter } from "next/navigation";
import leetcode from '../../public/images/leetcode.png'
import web from '../../public/images/web.jpg'
import Image from "next/image";

export default function Home() {
  const router = useRouter();

  return (
    <main className="pt-[10rem] w-full h-full border-2 p-8">
      <h1>
        Welcome to <span className="font-semibold">CodeBud</span> - Your Ultimate Resource for DSA Patterns, Web Development, and Insightful Blogs! Explore a curated list of questions designed to enhance your understanding of Data Structures and Algorithms, delve into the latest trends in web development, and stay informed with our thought-provoking blogs. Let the journey towards mastering coding and staying updated on industry insights begin!
      </h1>

      <div className="mt-[3rem]  h-[400px] w-full flex gap-10 ">

        {/* dsa  */}
        <div onClick={()=>router.push('/dsa')}
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
        <div onClick={()=>router.push('/web')}
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
    </main>
  );
}

