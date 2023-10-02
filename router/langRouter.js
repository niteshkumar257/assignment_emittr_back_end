const express=require('express');
const router=express.Router();
const {createLanguage,getAllLanguages,deleteLanguage} =require('../controller/langController');

router.post('/createLang',createLanguage);
router.get('/getAllLang',getAllLanguages);
router.get('/deleteLang',deleteLanguage);

module.exports=router;