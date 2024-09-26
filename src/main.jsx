import { createRoot } from "react-dom/client";
import "./index.css";

function App() {
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
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
