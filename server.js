import express from 'express'
import cors from 'cors'
import OpenAI from 'openai'

const PORT = process.env.PORT || 3001

const server = express()
server.use(cors())
server.use(express.json())
server.use(express.static('dist'))

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY
})

const messages = [
  {
    role: "system",
    content: `You are the Gift Genie!
    Your role is to provide gift ideas.
    Skip intros and conclusions.
    Only output gift suggestions.
    Do not ask the user any questions.`
  },
  {
    role: "user",
    content: "Suggest three random gift ideas"
  }
]

server.get('/api/gift', async (req, res) => {
  try {
  const response = await openai.chat.completions.create({
    model: 'gpt-5-nano',
    messages
  })
  
  const giftSuggestions = response.choices[0].message.content
  console.log(giftSuggestions)

  res.json({ giftSuggestions })
  } catch(err) {
    console.error(err)
    res.status(500).json({ message: "Unable to fetch gift suggestions, sorry!"})
  }
})

server.get('*', (req, res) => {
  res.sendFile(new URL('./dist/index.html', import.meta.url).pathname)
})

server.listen(PORT, () => console.log(`Listening on port ${PORT}`))