import 'dotenv/config';
import * as exercise from './exercise_model.mjs';
import express from 'express';
import validator from 'express-validator'

const PORT = process.env.PORT;

const app = express();

app.use(express.json());

/**
 * Create a new exercise
 */
/**
*
* @param {string} date
* Return true if the date format is MM-DD-YY where MM, DD and YY are 2 digit integers
*/
function isDateValid(date) {
    // Test using a regular expression. 
    // To learn about regular expressions see Chapter 6 of the text book
    const format = /^\d\d-\d\d-\d\d$/;
    return format.test(date);
}
  
  const { validationResult } = validator;
  app.post('/exercises', 
    validator.body('name').isString().notEmpty(),
    validator.body('reps').isInt({ min: 1 }),
    validator.body('weight').isInt({ min: 1 }),
    validator.body('unit').isIn(['kgs', 'lbs']),
    validator.body('date').custom(isDateValid),
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ Error: "Invalid request" });
      }
      const { name, reps, weight, unit, date } = req.body;
      try {
        const newExercise = await exercise.createExercise(name, reps, weight, unit, date);
        res.status(201).json(newExercise.toJSON());
      } catch (error) {
        res.status(500).json({ Error: error.message });
      }
  });


/**
 * Retrieve all exercises
 */
app.get('/exercises/', async (req, res) => {
    try {
        const exercises = await exercise.getAllExercises();
        const exercisesJSON = exercises.map(ex => ex.toJSON());
        res.status(200).json(exercisesJSON);
    } catch (error) {
        res.status(500).json({ Error: error.message });
    }
});


/**
 * Retrieve exercise by id
 */
app.get('/exercises/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const foundExercise = await exercise.getExerciseById(id);
        if (!foundExercise) {
            res.status(404).json({ Error: "Exercise not found" });
            return;
        }
        res.status(200).json(foundExercise);
    } catch (error) {
        res.status(500).json({ Error: error.message });
    }
});

/**
 * Update exercise
 */
app.put('/exercises/:id', 
  validator.body('name').isString().notEmpty(),
  validator.body('reps').isInt({ min: 1 }),
  validator.body('weight').isInt({ min: 1 }),
  validator.body('unit').isIn(['kgs', 'lbs']),
  validator.body('date').custom(isDateValid),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ Error: "Invalid request" });
    }
    const { id } = req.params;
    const { name, reps, weight, unit, date } = req.body;
    try {
      const updatedExercise = await exercise.updateExercise(id, name, reps, weight, unit, date);
      if (!updatedExercise) {
        res.status(404).json({ Error: "Exercise not found" });
        return;
      }
      res.status(200).json(updatedExercise.toJSON());
    } catch (error) {
      res.status(500).json({ Error: error.message });
    }
});


/**
 * Delete exercise
 */
app.delete('/exercises/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const foundExercise = await exercise.getExerciseById(id);
        if (!foundExercise) {
            res.status(404).json({ Error: "Exercise not found" });
            return;
        }
        await exercise.deleteExercise(id);
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ Error: error.message });
    }
});


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});