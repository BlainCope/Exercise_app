import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateExercisePage = () => { // CreateExercisePage component
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('');
    const [date, setDate] = useState('');

    const submitForm = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('/exercises', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    reps,
                    weight,
                    unit,
                    date
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            navigate('/');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form onSubmit={submitForm}>
            <label>
                Name:
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required/>
            </label>
            <label>
                Reps:
                <input type="number" value={reps} onChange={(e) => setReps(e.target.value)} required/>
            </label>
            <label>
                Weight:
                <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} required/>
            </label>
            <label>
                Unit:
                <select value={unit} onChange={(e) => setUnit(e.target.value)} required>
                    <option value="kgs">kgs</option>
                    <option value="lbs">lbs</option>
                </select>
            </label>
            <label>
                Date:
                <input  type='text' value={date} onChange={(e) => setDate(e.target.value)} required/>
            </label>
            <input type="submit" value="Create Exercise"/>
        </form>
    );
};

export default CreateExercisePage;
