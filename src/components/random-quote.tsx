import React from "react";
// import json from file
import quotes from "@/data/quote.json";
import { MessageSquareQuote, Quote } from "lucide-react";
type Quote = {
  quote: string;
  author: string;
};

function RandomQuote() {
  function getRandomQuote(): Quote {
    const randomNumber = Math.floor(Math.random() * quotes.length);
    const randomQuote: Quote = quotes[randomNumber];
    return randomQuote;
  }
  return (
    <div className="mt-6 yaldevi text-purple-600 dark:text-white">
      <p className=" text-left text-xl font-bold ">
        <MessageSquareQuote />
        {getRandomQuote().quote}
      </p>
      <p className=" text-left text-xl font-bold">
        - {getRandomQuote().author} -
      </p>
    </div>
  );
}

export default RandomQuote;
