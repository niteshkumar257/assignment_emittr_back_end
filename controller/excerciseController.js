const Exercise = require("../Models/ExcerciseSchema");

// Create a new exercise
// admin acess
const createExercise = async (req, res) => {
  try {
    const { name, difficultLevel, language, questions } = req.body;

    console.log(name, difficultLevel, language, questions);

    const exercise = new Exercise({
      name,
      difficultLevel,
      language,
      questions,
    });

    await exercise.save();

    res.status(201).json(exercise);
  } catch (error) {
    res.status(500).json({ error: "Exercise creation failed" });
  }
};

// get all excercise
// admin and user access
const getAllExcercise = async (req, res) => {
  try {
    const allEx = await Exercise.find();
    res.status(200).json({ allEx: allEx });
  } catch (err) {
    res.json({ error: err });
  }
};
// get excercise with language
// admin and user access
const getAllExcerciseWithLanugage = async (req, res) => {
  try {
    console.log(req.params);
    const langId = req.params.id;
    const difficult = req.params.difficult;
  
    if (difficult) {
      const allExWithLang = await Exercise.find({
        language: langId,
        difficultLevel: difficult,
      });

      res.status(200).json({ allExLang: allExWithLang });
    } else {
      const allExWithLang = await Exercise.find({ language: langId });

      res.status(200).json({ allExLang: allExWithLang });
    }
  } catch (err) {
    res.json({ error: err });
  }
};
// Delete an exercise by ID
// admin acess
const deleteExercise = async (req, res) => {
  try {
    const exerciseId = req.params.id;
    const deletedExercise = await Exercise.findByIdAndRemove(exerciseId);

    if (!deletedExercise) {
      return res.status(404).json({ error: "Exercise not found" });
    }

    res
      .status(200)
      .json({ message: "Exercise deleted", exercise: deletedExercise });
  } catch (error) {
    res.status(500).json({ error: "Exercise deletion failed" });
  }
};

module.exports = { createExercise, deleteExercise };

module.exports = {
  createExercise,
  deleteExercise,
  getAllExcercise,
  getAllExcerciseWithLanugage,
};
