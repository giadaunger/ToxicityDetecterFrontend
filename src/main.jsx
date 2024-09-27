import { createRoot } from "react-dom/client";
import React, { useState } from "react";
import "./index.css";

function App() {
  const [activeTab, setActiveTab] = useState("link");
  const [inputLinkValue, setInputLinkValue] = useState("");
  const [inputComment, setInputComment] = useState("");
  const [platform, setPlatform] = useState("");
  const [unknownPlatform, setUnknownPlatform] = useState("");

  const detectPlatform = (link) => {
    if (link.includes("reddit.com")) {
      return "Reddit";
    } else if (link.includes("twitter.com")) {
      return "Twitter";
    } else {
      return null;
    }
  };

  const handleInputLinkChange = (e) => {
    const link = e.target.value;
    setInputLinkValue(link);

    const detectedPlatform = detectPlatform(link);
    if (detectedPlatform) {
      setPlatform(detectedPlatform);
      setUnknownPlatform("");
    } else {
      setPlatform("");
      setUnknownPlatform(
        "Can only accept links from Reddit or Twitter threads!"
      );
    }
  };

  const handleInputCommentChange = (e) => {
    const comment = e.target.value;
    setInputComment(comment);
  };

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
          content. Simply paste a link or a comment in the textbox, and
          ToxiGuard will identify harmful language and explain why it's
          toxic—helping you foster safer online spaces.
        </p>
      </div>
      <div className="max-w-lg mx-auto mt-10">
        {/* Top bar with tabs */}
        <div className="flex border-b border-gray-300">
          <button
            className={`flex-1 py-2 text-center ${
              activeTab === "link"
                ? "border-b-4 border-blue-500 text-blue-500"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("link")}
          >
            Link
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
          {activeTab === "link" && (
            <div>
              <div className="flex gap-x-4">
                <textarea
                  className="w-full h-11 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 overflow-x-auto whitespace-nowrap"
                  placeholder="Paste a Reddit or Twitter link here"
                  value={inputLinkValue}
                  onChange={handleInputLinkChange}
                />
                <button
                  className={`border border-black justify-center mx-auto p-2 rounded-md ${
                    !platform
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-blue-500 text-white"
                  }`}
                  disabled={!platform}
                >
                  Submit
                </button>
              </div>
              {inputLinkValue && platform && (
                <p className="mt-2 text-sm text-gray-500">
                  Detected platform: {platform}
                </p>
              )}
              {unknownPlatform && (
                <p className="mt-2 text-sm text-red-500">{unknownPlatform}</p>
              )}
            </div>
          )}
          {activeTab === "comment" && (
            <div>
              <textarea
                className="w-full h-40 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Paste a comment here"
                onChange={handleInputCommentChange}
              />
              <button className="border border-black justify-center mx-auto p-2 bg-blue-500 text-white">
                Submit
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
