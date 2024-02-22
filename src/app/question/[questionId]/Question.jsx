'use client';

import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlineLike } from "react-icons/ai";

const Pattern = ({ params }) => {
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
                    <div key={i._id} className='bg-gray-200 my-8 p-6 flex justify-between items-center rounded-md mx-4 shadow-lg shadow-slate-400'>
                        <div className="">
                            <h1 className='font-bold text-3xl mb-3'>{i.questionName}</h1>
                            <h2 className='font-semibold text-xl mb-2'>{i.questionDescription}</h2>
                            <a href={i.questionLink} target="_blank" rel="noopener noreferrer" className='text-lg cursor-pointer'>
                                Link
                            </a>
                        </div>
                        <div className=" flex flex-col justify-center items-center">
                            <AiOutlineLike onClick={() => { setLiked(true); handleLike(i.like + 1, i._id); }}
                                className={`text-5xl hover:bg-blue-400 p-2 rounded-full transition duration-200 ease-soft-spring hover:cursor-pointer ${liked ? 'bg-blue-400' : ""}`} />
                            <p>{liked ? updatedLike : i.like}</p>
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

export default Pattern;
