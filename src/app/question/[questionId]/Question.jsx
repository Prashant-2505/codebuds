'use client';

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AiOutlineLike } from "react-icons/ai";

const Question = ({ params }) => {

    const companyBtnStyle = "bg-green-200 p-2 rounded-md cursor-pointer hover:bg-green-300 shadow-sm hover:shadow-md duration-200 ease-soft-spring"

    const isLoggedIn = false;
    const route = useRouter()

    const topic = params.questionId;
    const pattern = params.patternId;
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [liked, setLiked] = useState(false);
    const [updatedLike, setUpdatedLike] = useState(0);

    const getQuestion = async () => {
        try {
            setLoading(true);
            const { data } = await axios.post('/api/dsa/question/getQuestion',
                { topic, pattern },
                {
                    headers: { 'Accept': 'application/json' }
                });

            if (data.success) {
                setQuestions(data.question); // Fix here
            }
        } catch (error) {
            // Handle error appropriately
            console.error(error);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        getQuestion();
    }, [topic, pattern]);

    const handleLike = async (like, id) => {
        try {
            const { data } = await axios.post('/api/dsa/question/handleLike',
                { like, id },
                {
                    headers: { "Accept": "application/json" }
                });
            if (data.success) {
                setUpdatedLike(data.like);
            }
        } catch (error) {
            // Handle error appropriately
            console.error(error);
        }
    };

    return (
        <div className='pt-[7rem]'>
            {questions.length > 0 ? (
                questions.map((i) => (
                    <div className="bg-gray-200 my-8 p-6 rounded-md mx-4 shadow-lg shadow-slate-400">

                        <div key={i._id} className='  flex justify-between items-center '>
                            <div className="">
                                <h1 className='font-bold text-2xl mb-3'>{i.questionName}</h1>
                                <h2 className='font-semibold text-lg mb-2'>{i.questionDescription}</h2>
                                <a href={"https://leetcode.com/problems/two-sum/"} target="_blank" rel="noopener noreferrer" className=' cursor-pointer'>
                                    Link
                                </a>
                            </div>
                            <div className=" flex flex-col justify-center items-center">
                                <AiOutlineLike onClick={() => { setLiked(true); handleLike(i.like + 1, i._id); }}
                                    className={`text-5xl hover:bg-blue-400 p-2 rounded-full transition duration-200 ease-soft-spring hover:cursor-pointer ${liked ? 'bg-blue-400' : ""}`} />
                                <p>{liked ? updatedLike : i.like}</p>
                            </div>
                        </div>

                        {/* comapny list */}
                        <div className=" flex items-center pt-4 gap-3">
                            <h1 className=" font-semibold text-md">Asked in : </h1>

                            {isLoggedIn ?
                                <div className=" flex gap-5">
                                    <button className={companyBtnStyle}>Amazon</button>
                                    <button className={companyBtnStyle}>Google</button>
                                    <button className={companyBtnStyle}>Microsoft</button>
                                    <button className={companyBtnStyle}>Apple</button>
                                    <button className={companyBtnStyle}>Meta</button>
                                </div>
                                :
                                <button
                                className=" bg-red-500 p-2 rounded-md text-white hover:bg-red-600 duration-200 ease-soft-spring"
                                onClick={()=>route.push('/login')}
                                >Please login to unclock</button>
                            }
                        </div>
                    </div>
                ))
            ) : (
                <h1>
                    No Questions
                </h1>
            )}
        </div>
    );
};

export default Question;
