const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 3002; // Puedes cambiar el puerto si lo deseas

app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.post('/transcribe', async (req, res) => {
  const apiKey = process.env.OPENAI_API_KEY;
  const apiVersion = 'v1';
  const apiUrl = `https://api.openai.com/${apiVersion}/audio/transcriptions`;
  console.log('---->', Object.keys(req.body));
  try {
    const response = await axios.post(apiUrl, req.body, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error al llamar a la API de Whisper ASR:', error);
    res.status(500).json({ error: 'Error al llamar a la API de Whisper ASR' });
  }
});

app.listen(port, () => {
  console.log(`Servidor proxy escuchando en http://localhost:${port}`);
});
