const Language=require('../Models/languageSchema');


// Create a new language
// only admin access
const createLanguage = async (req, res) => {
  try {
    const { name } = req.body;
    console.log(name);
    const language = new Language({ name });
    await language.save();
    res.status(201).json(language);
  } catch (error) {
    res.status(500).json({ error: 'Language creation failed' });
  }
};

// Get all languages
// user and admin both can access
const getAllLanguages = async (req, res) => {
  try {
    const languages = await Language.find();
    res.status(200).json(languages);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch languages' });
  }
};

// Delete a language by ID
// admin access
const deleteLanguage = async (req, res) => {
  try {
    const languageId = req.params.id;
    const deletedLanguage = await Language.findByIdAndRemove(languageId);
    
    if (!deletedLanguage) {
      return res.status(404).json({ error: 'Language not found' });
    }
    
    res.status(200).json({ message: 'Language deleted', language: deletedLanguage });
  } catch (error) {
    res.status(500).json({ error: 'Language deletion failed' });
  }
};

module.exports = { createLanguage, getAllLanguages, deleteLanguage };
