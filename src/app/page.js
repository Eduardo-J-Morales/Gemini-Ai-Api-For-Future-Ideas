"use client"

import PagesManifestPlugin from "next/dist/build/webpack/plugins/pages-manifest-plugin";
import Image from "next/image";
import { useState } from 'react';


export default function Home() {
  const [quote, setQuote] = useState("Teh jouney of a thuosand miles begins with a single step.")
  const [author, setAuthor] = useState('Lao Tzu')

  const quotes = []

  const generateQuote = () => {
    try{

      const prompt = "Generate an inspirational quote."

    const response = await palm.generateText({prompt});

    const generatedQuote = response.text


    
    }
  }

  return (
        <div>
          <h1>Quote of the Day</h1>
          <p>"{quote}"</p>
          <p>- {author}</p>
        <button onClick={generateQuote}>New Quote</button>
        </div>
  );
}
