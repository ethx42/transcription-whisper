import React from 'react';
import './App.css';
import WhisperTranscription from './components/WhisperTranscription';

function App() {
  return (
    <div className="App">
      <h1>Transcripción de audio con Whisper ASR</h1>
      <WhisperTranscription />
    </div>
  );
}

export default App;
