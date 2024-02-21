'use client'
import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";



const Dsa = () => {


  const [selectedTopic, setSelectedTopic] = useState("");

const router = useRouter();

const getTopics = async () => {
  try {
    const { data } = await axios.get('/api/dsa/topic/alltopic');
    if (data.success) {
      return data.topics;
    }
  } catch (error) {
    console.error("Error fetching topics:", error);
    throw error;
  }
};

async function getPattern() {
  try {
    const { data } = await axios.post('/api/dsa/pattern/getPattern', { topic: selectedTopic }, {
      headers: { 'Content-Type': 'application/json' }
    });
    return data.pattern;
  } catch (error) {
    console.error("Error fetching patterns:", error);
    throw error;
  }
}

const { data: topicData, isLoading: isTopicsLoading, isError: isTopicsError, error: topicsError } = useQuery({
  queryKey: "Topic",
  queryFn: getTopics
});

const { data: patternData, isLoading: isPatternLoading, isError: isPatternError, error: patternError } = useQuery({
  queryKey: ["Pattern", selectedTopic], // Include selectedTopic in the query key
  queryFn: getPattern,
  enabled: selectedTopic !== null && selectedTopic !== undefined && selectedTopic !== '',
  staleTime: Infinity

});

  return (
       <div className=" w-full h-full px-8 pb-6 shadow-md">
      {isTopicsLoading ? (
        <p>Loading...</p>
      ) : isTopicsError || isPatternError ? (
        <p>Error loading data. Please try again.</p>
      ) :

        (
          <>
           
            <div className="mt-10  h-auto">
              <Accordion variant="splitted">
                {topicData?.map((topic) => (
                  <AccordionItem onClick={() => setSelectedTopic(topic._id)} key={topic._id} aria-label={topic.topic} title={topic.topic}>
                    {patternData?.map((i) => (
                      isPatternLoading ? (
                        <p>Loading...</p>
                      ) : (
                        <p key={i.pattern} onClick={() => router.push(`/question/${topic._id}/${i._id}`)} className="bg-slate-300 px-3 py-4 mb-2 rounded-md cursor-pointer hover:bg-slate-400 duration-250 ease-soft-spring">
                          {i.pattern}
                        </p>
                      )
                    ))}

                  </AccordionItem>
                ))}
              </Accordion>
            </div>

          </>
        )
      }
    </div>
    
  )
}

export default Dsa
