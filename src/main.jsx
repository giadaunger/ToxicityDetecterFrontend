import { createRoot } from "react-dom/client";
import React, { useState } from "react";
import { MoonLoader } from "react-spinners";
import "./index.css";

function App() {
  const [activeTab, setActiveTab] = useState("link");
  const [inputLinkValue, setInputLinkValue] = useState("");
  const [inputComment, setInputComment] = useState("");
  const [platform, setPlatform] = useState("");
  const [unknownPlatform, setUnknownPlatform] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const detectPlatform = (link) => {
    if (link.includes("reddit.com")) {
      return "Reddit";
    } else if (link.includes("x.com")) {
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

  const handleSubmit = async () => {
    setLoading(true);
    setResponse(null);
    let data =
      activeTab === "link" ? { link: inputLinkValue } : { text: inputComment };
    const url =
      activeTab === "link"
        ? "http://localhost:5000/submit"
        : "http://localhost:5000/classify";

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      setResponse(result);
      setLoading(false);
    } catch (error) {
      console.error("Error sending data to backend:", error);
      setLoading(false);
    }
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
                  onClick={handleSubmit}
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
              <button
                className="border border-black justify-center mx-auto p-2 bg-blue-500 text-white"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          )}
        </div>

        {/* Display Loading Indicator */}
        {loading && (
          <div className="mt-6 p-4 flex justify-center">
            <MoonLoader color="#0066ff" />
          </div>
        )}

        {/* Display Results */}
        {response && activeTab === "link" && !loading && (
          <div className="mt-6 bg-gray-100 p-4 rounded-md">
            <h3 className="text-xl">Backend Response for Link:</h3>
            <p>Title: {response.title}</p>
            <p>Author: {response.author}</p>
            <pre>{JSON.stringify(response, null, 2)}</pre>
          </div>
        )}

        {response && activeTab === "comment" && !loading && (
          <div className="mt-6 bg-gray-100 p-4 rounded-md">
            <h3 className="text-xl">Backend Response for Comment:</h3>
            <pre>{JSON.stringify(response, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
