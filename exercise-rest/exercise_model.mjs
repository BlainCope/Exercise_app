import mongoose from 'mongoose';
import 'dotenv/config';

mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    { useNewUrlParser: true }
);


// Connect to to the database
const db = mongoose.connection;
// The open event is called when the database connection successfully opens
db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

/**
 * Define the schema
 */
const exerciseSchema = mongoose.Schema({
    name: { type: String, required: true},
    reps: { type: Number, required: true},
    weight: { type: Number, required: true },
    unit: { type: String, required: true },
    date: { type: String, required: true },
});

/**
 * Compile the model from the schema. This must be done after defining the schema.
 */
const Exercise = mongoose.model("Exercise", exerciseSchema);

const createExercise = async (name, reps, weight, unit, date) => {
    const exercise = new Exercise({name: name, reps: reps, weight: weight, unit: unit, date: date});
    return exercise.save();
}

const getAllExercises = async () => {
    return await Exercise.find({});
}

const getExerciseById = async (id) => {
    return await Exercise.findById(id);
}

const updateExercise = async (id, name, reps, weight, unit, date) => {
    const updatedExercise = await Exercise.findByIdAndUpdate(id, { name, reps, weight, unit, date }, { new: true });
    return updatedExercise;
}

const deleteExercise = async (id) => {
    return await Exercise.findByIdAndRemove(id);
}

export { createExercise, getAllExercises, getExerciseById, updateExercise, deleteExercise };
