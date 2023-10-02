const express=require('express');
const router=express.Router();
const {login,register,getAlluser,updateScore,deleteuser,updateUserDetails,getAllPastTest,getUser,resetTestInfo,leaderBoardPosition} =require('../controller/userController');


router.post('/login',login)
router.post('/register',register);
router.get('/getAlluser',getAlluser);
router.post('/updateScore',updateScore);
router.delete('/deleteuser',deleteuser);
router.get('/getUser/:id',getUser);
router.put('/updateUserDetails',updateUserDetails);
router.get('/getAllPastTest/:userId',getAllPastTest);
router.put('/resetTestInfo/:userId',resetTestInfo);
router.get('/leaderboard',leaderBoardPosition);

module.exports=router;