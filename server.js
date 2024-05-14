const PORT = 8000;
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const { GoogleGenerativeAI } = require('@google/generative-ai');

const getAI = new GoogleGenerativeAI(process.env.GOOGLE_GEN_AI_KEY);

app.post('/gemini', async (req, res) => {
  try {
    console.log('history:', req.body.history);
    console.log('message:', req.body.message);
    const model = getAI.getGenerativeModel({ model: 'gemini-pro' });
    console.log('model:', model);
    const chat = model.startChat({
      history: req.body.history,
    });
    const msg = req.body.message;

    const result = await chat.sendMessage(msg);
    const response = await result.response;
    const text = response.text();
    res.send(text);
  } catch (error) {
    console.error(error);
    res.status(500).send('Something went wrong! Please try again later');
    return error;
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
