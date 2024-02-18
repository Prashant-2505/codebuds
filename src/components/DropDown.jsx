import React, { useState } from 'react';
import { Button, ButtonGroup } from "@nextui-org/react";
const DropDown = ({ heading, droptItem, setSelectedTopic }) => {
  const [show, setShow] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");

  return (
    <div className='w-[80%]'>
      
      <button
        onClick={(e) => {
          e.preventDefault();
          setShow(!show);
        }}
        className={`heading bg-white w-full mb-4 p-3 rounded-md hover:bg-slate-100 duration-200 ease-in-out `}
      >
        {selectedItem || heading}
      </button>
      <div
        className={`  droptItem w-full bg-white p-4 mb-2 h-[25vh] overflow-scroll rounded-md ${!show ? "hidden" : ""}`}
      >
        {droptItem.map((item, i) => (
          <p
            onClick={() => {
              setSelectedTopic(item._id);
              setSelectedItem(item.topic);
            }}
            className=' bg-gray-300 text-left mb-4 px-3 py-4 rounded-md'
            key={i}
          >
            {item.topic}
          </p>
        ))}
      </div>
    </div>
  );
};

export default DropDown;
