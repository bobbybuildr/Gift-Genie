import OpenAI from "openai"
import { marked } from "marked"
import DOMPurify from 'dompurify'

const lampBtn = document.getElementById('lamp-btn')
const responseContainer = document.getElementById('response-container')

lampBtn.addEventListener('click', getGiftSuggestions)

async function getGiftSuggestions() {
  lampBtn.classList.add('lamp-loading')
  responseContainer.innerHTML = `<p>Summoning gift ideas...</p>`

  try{
    const response = await fetch('http://localhost:3001/api/gift', {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })

    const data = await response.json()

    responseContainer.innerHTML = DOMPurify.sanitize(marked.parse(data.giftSuggestions))
  } catch(err) {
    responseContainer.innerHTML = "<p>Unable to fetch suggestions. Please try again.</p>"
    console.error(err)
  } finally {
    lampBtn.classList.remove('lamp-loading')
  }
}