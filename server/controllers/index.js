const fs = require('fs');
const { OpenAIApi } = require('openai');
const configuration = require('../config');

const openai = new OpenAIApi(configuration);

const transcribeHandler = async (req, res) => {
  try {
    await openai.createTranscription(
      fs.createReadStream(req.file.path),
      'whisper-1'
    ).then(resOpenAI => {
      res.status(resOpenAI.status).json({ message: resOpenAI.data.text, filePath: req.file.path });
    }).catch(err => {
      res.status(err.response.status).json({ error: `OpenAI: ${err.response.data.error.message}` });
    });
  } catch (error) {
    console.error('Error Calling Whisper ASR API:', error);
    res.status(500).json({ error: error.code });
  }
};

module.exports = {
  transcribeHandler,
};
