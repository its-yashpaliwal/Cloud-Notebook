import React from 'react'
import { useContext } from 'react';
import noteContext from '../context/notes/noteContext';
import { useEffect } from 'react';

export const About = () => {
  const a= useContext(noteContext);
  useEffect(() => {
    a.update();
  }, [])
  
  return (
    <div>This is about {a.state.name}</div>
  )
}

export default About;