'use client'

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Pattern = ({ params }) => {
    const topic = params.questionId;
    const pattern = params.patternId;
    const [question, setQuestion] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const router = useRouter();

    const getQuestion = async () => {
        try {
            const { data } = await axios.post('/api/dsa/question/getQuestion',
                { topic, pattern },
                {
                    headers: { 'Accept': 'application/json' }
                });

            if (data.success) {
                setQuestion(data.question); // Fix here
            }
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getQuestion();
    }, [topic, pattern]);

    return (
        <div className='pt-[7rem]'>
            {question?.length > 0 ? (
                question.map((i) => (
                    <div key={i.questionId} className='bg-gray-200 my-8 p-6 rounded-md mx-4 shadow-lg shadow-slate-400'>
                        <h1 className='font-bold text-4xl mb-3'>{i.questionName}</h1>
                        <h2 className='font-semibold text-3xl mb-2'>{i.questionDescription}</h2>
                       <a href={i.questionLink} target="_blank" rel="noopener noreferrer" className='text-xl cursor-pointer'>
                            Link
                        </a>
                    </div>
                ))
            ) : (
                <h1>
                    No Question
                </h1>
            )}
        </div>
    );
};

export default Pattern;
