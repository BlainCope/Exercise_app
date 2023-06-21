import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaTrash, FaPencilAlt } from 'react-icons/fa';
import ExerciseTable from '../components/ExerciseTable';

function Homepage() {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    fetch('/exercises')
      .then(response => response.json())
      .then(data => setExercises(data))
      .catch(err => console.log(err));
  }, []);

  function deleteExercise(id) {
    fetch(`/exercises/${id}`, { method: 'DELETE' }) // call the endpoint with DELETE method
      .then(response => {
        if (response.ok) {
          setExercises(exercises.filter(ex => ex._id !== id)); // update state after deletion
        } else {
          throw new Error('Something went wrong');
        }
      })
      .catch(err => console.log(err));
  }

  return (
    <div>
      <h3>Home Page</h3>
      <Link to="/create">Create New Exercise</Link>
      <ExerciseTable exercises={exercises} deleteExercise={deleteExercise} />
    </div>
  );
}

export default Homepage;
