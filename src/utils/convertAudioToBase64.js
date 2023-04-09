export function convertAudioToBase64(audioFile) {
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
}
