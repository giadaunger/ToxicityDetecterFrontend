import { createRoot } from "react-dom/client";
import React, { useState } from "react";
import Chart from "react-apexcharts";
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

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setResponse(null);
    setInputLinkValue("");
    setInputComment("");
    setUnknownPlatform("");
    setLoading(false);
  };

  // Prepare chart options
  const chartOptions = {
    chart: {
      type: "polarArea",
    },
    labels: [
      "Toxic",
      "Severe Toxic",
      "Obscene",
      "Threat",
      "Insult",
      "Identity Hate",
    ],
    fill: {
      opacity: 1,
    },
    stroke: {
      width: 1,
      colors: ["#000"],
    },
    yaxis: {
      show: false,
    },
    plotOptions: {
      polarArea: {
        rings: {
          strokeWidth: 1,
          strokeColor: "#333",
        },
        spokes: {
          strokeWidth: 2,
          strokeColor: "#333",
        },
        size: "90%",
      },
    },
    colors: ["#FF4560", "#00E396", "#FEB019", "#008FFB", "#775DD0", "#FF66C3"],
  };

  const chartSeries =
    response && response.prediction
      ? [
          response.prediction.toxic * 100,
          response.prediction.severe_toxic * 100,
          response.prediction.obscene * 100,
          response.prediction.threat * 100,
          response.prediction.insult * 100,
          response.prediction.identity_hate * 100,
        ]
      : [];

  return (
    <div className="w-11/12 mx-auto">
      <div className="w-2/3 text-center mx-auto pt-10">
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
      <div className="mx-auto mt-10 w-2/3">
        {/* Top bar with tabs */}
        <div className="w-1/2 mx-auto flex border-b border-gray-300">
          <button
            className={`flex-1 py-2 text-center ${
              activeTab === "link"
                ? "border-b-4 border-blue-500 text-blue-500"
                : "text-gray-600"
            }`}
            onClick={() => handleTabChange("link")}
          >
            Link
          </button>
          <button
            className={`flex-1 py-2 text-center ${
              activeTab === "comment"
                ? "border-b-4 border-blue-500 text-blue-500"
                : "text-gray-600"
            }`}
            onClick={() => handleTabChange("comment")}
          >
            Comment
          </button>
        </div>

        {/* Content Area */}
        <div className="p-4">
          {activeTab === "link" && (
            <div>
              <div className="flex justify-center space-x-4">
                <textarea
                  className="w-[43%] h-11 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 overflow-x-auto whitespace-nowrap"
                  placeholder="Paste a Reddit or Twitter link here"
                  value={inputLinkValue}
                  onChange={handleInputLinkChange}
                />
                <button
                  className={`border border-black p-2 rounded-md ${
                    !platform
                      ? "border-[#6494ed7d] bg-[#6494ed7d] text-[#0000007d] cursor-not-allowed"
                      : "flex rounded-md border border-[#6495ED] justify-center mx-auto p-2 bg-[#6495ED] text-white shadow-md transition duration-300 hover:scale-125 hover:bg-[#bde1ed] hover:border-[#71bfd9]"
                  }`}
                  disabled={!platform}
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
              {inputLinkValue && platform && (
                <p className="mt-2 text-sm text-gray-500 w-1/2 mx-auto">
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
                className="w-1/2 mx-auto flex h-40 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Paste a comment here"
                value={inputComment}
                onChange={handleInputCommentChange}
              />
              <button
                className="mt-8 flex w-1/3 rounded-md border border-[#6495ED] justify-center mx-auto p-2 bg-[#6495ED] text-white shadow-md transition duration-300 hover:scale-125 hover:bg-[#bde1ed] hover:border-[#71bfd9]"
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
            <h3 className="text-xl">Toxicity Analysis for Each Comment:</h3>
            {response.comments.map((comment, index) => {
              const commentSeries = [
                comment.toxicity.toxic * 100,
                comment.toxicity.severe_toxic * 100,
                comment.toxicity.obscene * 100,
                comment.toxicity.threat * 100,
                comment.toxicity.insult * 100,
                comment.toxicity.identity_hate * 100,
              ];

              return (
                <div key={index} className="mb-6">
                  <h4>Comment {index + 1}:</h4>
                  <p>{comment.text}</p>
                  <Chart
                    options={chartOptions}
                    series={commentSeries}
                    type="polarArea"
                    height="350"
                    width="100%"
                  />
                  <p>{comment.explanation}</p>
                </div>
              );
            })}
          </div>
        )}

        {response && activeTab === "comment" && !loading && (
          <div className="mt-6 bg-gray-100 p-4 rounded-md shadow-md">
            <h3 className="text-xl font-semibold">
              Toxicity Analysis for Comment:
            </h3>
            <Chart
              options={chartOptions}
              series={chartSeries}
              type="polarArea"
              height="500"
              width="100%"
            />
          </div>
        )}
        {response && response.explanation && (
          <div className="mt-4 p-4 bg-gray-100 rounded-md mb-20 shadow-md">
            <h4 className="text-xl font-semibold mb-4">Explanation:</h4>
            <p>{response.explanation}</p>
          </div>
        )}
      </div>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
