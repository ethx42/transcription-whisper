require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { uploadMiddleware } = require('./middlewares');
const { transcribeRoute } = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json({ limit: '50mb' }));
app.use(cors());

app.post('/transcribe', uploadMiddleware.single('audio'), transcribeRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
