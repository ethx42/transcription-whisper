import React, { useState } from 'react';
import axios from 'axios';

const serverPort = 5001;

const WhisperTranscription = () => {
  const [audioFile, setAudioFile] = useState(null);
  const [transcription, setTranscription] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  const handleFileChange = (event) => {
    setAudioFile(event.target.files[0]);
  };


  const handleTranscription = async () => {
    let response;

    try {
      if (!audioFile) {
        setUploadStatus('Please select a file before uploading.');
        return;
      }
  
      const formData = new FormData();
      formData.append('audio', audioFile);
  
      try {
        await setUploadStatus('Processing');
        response = await axios.post(`http://localhost:${serverPort}/transcribe`, formData);
        await setUploadStatus('Completed');
      } catch (error) {
        setUploadStatus('An error occurred while uploading the file.');
      }
      
      await setTranscription(response.data.message);
    } catch (error) {
      await setUploadStatus('Something went wrong');
      console.error('Error al llamar a la API de Whisper ASR:', error);
    }
  };

  return (
    <div>
      <input type="file" accept="audio/*" onChange={handleFileChange} />
      <button onClick={handleTranscription} disabled={!audioFile}>
        Transcribir audio con Whisper ASR
      </button>
      <h5>{uploadStatus}</h5>
      {transcription && <pre>{JSON.stringify(transcription, null, 2)}</pre>}
    </div>
  );
};

export default WhisperTranscription;
