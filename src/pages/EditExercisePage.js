import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditExercisePage = () => {
    const navigate = useNavigate(); // hook from react-router-dom
    const { id } = useParams();
    const [name, setName] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('');
    const [date, setDate] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchExercise = async () => {
            const response = await fetch(`/exercises/${id}`, { // fetch the exercise with the given id
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                    }
                    });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`); // throw an error if the response is not ok
            }
            const data = await response.json();
            setName(data.name);
            setReps(data.reps);
            setWeight(data.weight);
            setUnit(data.unit);
            setDate(data.date);
        };
        fetchExercise().catch(error => { // catch the error
            console.log(error);
            setError(error.message); 
        });
    }, [id]);

    const submitForm = async (event) => { 
        event.preventDefault();
        try {
            const response = await fetch(`/exercises/${id}`, { // fetch the exercise with the given id
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    reps,
                    weight,
                    unit,
                    date: new Date()
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            navigate('/');
        } catch (error) {
            console.log(error);
            setError(error.message);
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
                <input type="date" value={new Date().toISOString().substring(0, 10)} readOnly/>
            </label>
            <input type="submit" value="Edit Exercise"/>
            {error && <p>{error}</p>}
        </form>
    );
};

export default EditExercisePage;
