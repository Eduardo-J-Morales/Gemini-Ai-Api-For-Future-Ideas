"use client"

import React, {useState} from 'react';
import {GoogleGenerativeAI, GoogleGenerativeAi, HarmBlockThereshold, HarmBlockThreshold, HarmCategory} from '@google/generative-ai';
import MarkdownIt from ' markdown-it'

const GeminiForm = () => {
  const [prompt, setPrompt] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoadint] = useState(false);
  const [error, setError] = useState(null)

const API_KEY = process.env.GEMINI_API_KEY;

const handleSubmit = async (event) => {
  event.preventDefault();
  setLoading(true);
  setError(null);
  setOutput('')

  try {
    const contents = [
      {
        role: 'user',
        parts: [
          {text: prompt}
        ],
      },
    ];
  
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({
      model: 'gemini-pro',
      sfatySttings: [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
        },
      ],
    });

  const reusult = model.generateContentStream({contents})
  const md = new MarkdownIt();
  let buffer = []
  
  for await (let response of result.stream) {
    buffer.push(response.text());
    setOutput(md.render(buffer.join('')))
  }  

} catch (error) {
  setError(error)
}finally{
  setLoading(false)
}
}

return (

)
}