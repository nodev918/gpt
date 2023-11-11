const express = require('express');
const axios = require('axios');
const app = express();
const OpenAI = require("openai");
const cors = require('cors');
const fs = require('fs');


app.use(express.json());
app.use(cors());

const openai = new OpenAI();

let historyMessage = []

app.use(express.static('ui/dist'));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'ui','dist','index.html'));
});

async function query(queryMessage) {
  const completion = await openai.chat.completions.create({
    messages: queryMessage,
    model: "gpt-3.5-turbo",
  });
  return completion.choices[0]
}

app.post('/query', async (req, res) => {
  console.log("history:")
  
  try {

    const {prompt} = req.body
    console.log(prompt)
    
    historyMessage.push({role:"system", content:prompt})

    console.log(historyMessage)
    const gptResult = await query(historyMessage)
    
    console.log(gptResult)
    const message = gptResult.message.content
    res.json({message:message})
  } catch (error) {
    res.status(500).json({ message: 'Error while querying GPT API', error });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

async function readJsonFile( source ) {
  try {
    // Read the file and parse it to JSON
    const data = JSON.parse(fs.readFileSync(source, 'utf8'));
    return data;
  } catch (error) {
    console.error('Error reading file from disk:', error);
    throw error;
  }
}

readJsonFile( 'data.json' ).then(data => {
  data.forEach(item=>historyMessage.push(item))
  console.log(data);
}).catch(error => {
  console.error('An error occurred:', error);
});