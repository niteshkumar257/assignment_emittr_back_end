const express =require('express');
const router=express.Router();
const {createExercise,deleteExercise,getAllExcercise,getAllExcerciseWithLanugage}=require('../controller/excerciseController');


router.post('/CreateEx',createExercise);
// router.get('/getAllEx',getAllExcercise);
router.get('/getAllEx/:id/:difficult',getAllExcerciseWithLanugage)
router.delete('/deletEx',deleteExercise);


module.exports=router;