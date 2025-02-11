"use client"

import React, { useState } from 'react';
import { createReflection } from '@/actions/teacher/createReflection';

const AddReflection = () => {
    const [inputs, setInputs] = useState({
      id: '',
      title: '',
      courseId: 0,
      teacherId: 0,
    });
  
    const handleChange = (e: { target: { name: any; value: any; }; }) => {
      const { name, value } = e.target;
      setInputs({
        ...inputs,
        [name]: name === 'courseId' || name === 'teacherId' ? Number(value) : value,
      });
    };
  
    return (
      <form 
      className="max-w-sm  p-6 space-y-4 bg-white rounded-lg shadow text-black"
      onSubmit={() => {
        createReflection(inputs);
      }}
    >
      <h2 className="text-xl font-semibold mb-4 text-black">Create Reflection</h2>
      
      <input
        name="id"
        placeholder="ID"
        value={inputs.id}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      
      <input
        name="title"
        placeholder="Title"
        value={inputs.title}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      
      <input
        name="courseId"
        placeholder="Course ID"
        value={inputs.courseId}
        onChange={handleChange}
        type="number"
        className="w-full p-2 border rounded"
      />
      
      <input
        name="teacherId"
        placeholder="Teacher ID"
        value={inputs.teacherId}
        onChange={handleChange}
        type="number"
        className="w-full p-2 border rounded"
      />
      
      <button 
        type="submit"
        className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        Submit
      </button>
    </form>
    );
  };
  
  export default AddReflection;