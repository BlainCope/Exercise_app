import React, { useEffect, useState } from 'react';

const ExercisesList = () => {
  const [exercises, setExercises] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('./exercises');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setExercises(data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <ul>
      {exercises.map(exercise => (
        <li key={exercise._id}>{exercise.name}</li>
      ))}
    </ul>
  );
};

export default ExercisesList;
