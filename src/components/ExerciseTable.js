import React from 'react';
import { Link } from 'react-router-dom';
import { FaTrash, FaPencilAlt } from 'react-icons/fa';

function ExerciseTable({ exercises, deleteExercise }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Reps</th>
          <th>Weight</th>
          <th>Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {exercises.map(exercise => (
          <tr key={exercise._id}>
            <td>{exercise.name}</td>
            <td>{exercise.reps}</td>
            <td>{exercise.weight}</td>
            <td>{exercise.date.substring(0, 10)}</td>
            <td>
              <Link to={`/exercises/${exercise._id}`}>
                <FaPencilAlt />
              </Link>
              <FaTrash onClick={() => deleteExercise(exercise._id)} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ExerciseTable;
