"use client"
import React, { useState } from 'react';
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from '@google/generative-ai';
import MarkdownIt from 'markdown-it';
const GeminiForm = () => {
  const [prompt, setPrompt] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const API_KEY = process.env.OPEN_API_KEY; 
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setOutput('');
    try {
      const contents = [
        {
          role: 'user',
          parts: [
            { text: prompt }, 
          ],
        },
      ];
      const genAI = new GoogleGenerativeAI("YOUR_API_KEY");
      const model = genAI.getGenerativeModel({
        model: 'gemini-1.5-flash',
        safetySettings: [
          {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
          },
        ],
      });
      const result = await model.generateContentStream({ contents });
      const md = new MarkdownIt();
      let buffer = [];
      for await (let response of result.stream) {
        buffer.push(response.text());
        setOutput(md.render(buffer.join('')));
      }
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button
 type="submit" disabled={loading}>
          {loading ? 'Generating...' : 'Submit'}
        </button>
      </form>
      {error && <div>Error: {error.message}</div>}
      <div dangerouslySetInnerHTML={{ __html: output }} /> 
    </div>
  );
};
export default GeminiForm;