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
      <form onSubmit={(e) => {
        createReflection(inputs);
      }}>
        <input
          name="id"
          value={inputs.id}
          onChange={handleChange}
        />
        <input
          name="title"
          value={inputs.title}
          onChange={handleChange}
        />
        <input
          name="courseId"
          value={inputs.courseId}
          onChange={handleChange}
          type="number"
        />
        <input
          name="teacherId"
          value={inputs.teacherId}
          onChange={handleChange}
          type="number"
        />
        <button type="submit">Submit</button>
      </form>
    );
  };
  
  export default AddReflection;