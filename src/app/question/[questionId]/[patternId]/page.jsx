
import React from 'react'
import Question from '../Question'

export const metadata = {
  title: "Patterns",
  description: "Patterns based on topics",
};

const page = ({ params }) => {
 

  return (
    <div>
      <Question params={params} />
    </div>
  )
}

export default page
