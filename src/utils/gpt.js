import { ChatGPTAPI } from "chatgpt";

const GPT = new ChatGPTAPI({
  apiKey: process.env.CHAT_GPT_API_KEY,
});

// Path: src\utils\gpt.js

export { GPT };
