import { createRoot } from "react-dom/client";
import React, { useState } from "react";
import "./index.css";

function App() {
  const [activeTab, setActiveTab] = useState("reddit");

  return (
    <div>
      <div className="w-11/12 md:w-1/2 text-center mx-auto pt-10">
        <h1 className="text-5xl pb-4">ToxiGuard</h1>
        <h2 className="text-2xl pb-8">
          Detect Toxicity Instantly — Know What Hurts, and Why.
        </h2>
        <p className="text-xl">
          ToxiGuard is an AI-powered tool designed to analyze comments and
          threads from platforms like Reddit and Twitter to detect toxic
          content. Simply paste a link to a thread from Reddit or Twitter, or
          enter a comment in the textbox, and ToxiGuard will identify harmful
          language and explain why it's toxic—helping you foster safer online
          spaces.
        </p>
      </div>
      <div className="max-w-lg mx-auto mt-10">
        {/* Top bar with tabs */}
        <div className="flex border-b border-gray-300">
          <button
            className={`flex-1 py-2 text-center ${
              activeTab === "reddit"
                ? "border-b-4 border-blue-500 text-blue-500"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("reddit")}
          >
            Reddit
          </button>
          <button
            className={`flex-1 py-2 text-center ${
              activeTab === "twitter"
                ? "border-b-4 border-blue-500 text-blue-500"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("twitter")}
          >
            Twitter
          </button>
          <button
            className={`flex-1 py-2 text-center ${
              activeTab === "comment"
                ? "border-b-4 border-blue-500 text-blue-500"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("comment")}
          >
            Comment
          </button>
        </div>

        {/* Content Area */}
        <div className="p-4">
          {activeTab === "reddit" && (
            <textarea
              className="w-full h-40 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Paste a Reddit link here"
            />
          )}
          {activeTab === "twitter" && (
            <textarea
              className="w-full h-40 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Paste a Twitter link here"
            />
          )}
          {activeTab === "comment" && (
            <textarea
              className="w-full h-40 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Paste a comment here"
            />
          )}
        </div>
      </div>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
