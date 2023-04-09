import React, { useState } from 'react';
import axios from 'axios';

const serverPort = 3002;

const WhisperTranscription = () => {
  const [audioFile, setAudioFile] = useState(null);
  const [transcription, setTranscription] = useState(null);

  const handleFileChange = (event) => {
    setAudioFile(event.target.files[0]);
  };

  const convertAudioToBase64 = (audioFile) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        const base64 = event.target.result.split(',')[1];
        resolve(base64);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(audioFile);
    });
  };

  const handleTranscription = async () => {

    try {
      const base64Audio = await convertAudioToBase64(audioFile);
  
      // Utiliza la ruta /transcribe de tu servidor proxy en lugar de la API de OpenAI directamente
      const response = await axios.post(`http://localhost:${serverPort}/transcribe`, {
        'audio': {
          'data': base64Audio
        },
        'config': {
          'language_code': 'es-ES' // Código de idioma para español
        }
      });
  
      setTranscription(response.data);
    } catch (error) {
      console.error('Error al llamar a la API de Whisper ASR:', error);
    }
  };

  return (
    <div>
      <input type="file" accept="audio/*" onChange={handleFileChange} />
      <button onClick={handleTranscription} disabled={!audioFile}>
        Transcribir audio con Whisper ASR
      </button>
      {transcription && <pre>{JSON.stringify(transcription, null, 2)}</pre>}
    </div>
  );
};

export default WhisperTranscription;
