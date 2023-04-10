const fs = require('fs');
const { OpenAIApi } = require('openai');
const configuration = require('../config');

const openAi = new OpenAIApi(configuration);

const transcribeHandler = async (req, res) => {
  const audioFile = fs.createReadStream(req.file.path);

  await openAi.createTranscription(
    audioFile,
    'whisper-1'
  ).then(resOpenAI => {
    res.status(resOpenAI.status).json({ message: resOpenAI.data.text });
  }).catch(e => {
    res.status(e.response.status).json({ error: e.response.data.error.message });
  });
};

module.exports = {
  transcribeHandler,
};
