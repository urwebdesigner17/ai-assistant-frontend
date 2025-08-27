import { useState } from "react";
import "./App.css"; // Import custom CSS

export default function App() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [validation, setValidation] = useState(
    "Please click a button above to enable the input field."
  );
  const [mode, setMode] = useState(""); // track which button is active

  const API_URL = "https://ai-assistant-backend-s7kq.onrender.com/api/chat"; // backend endpoint

  const handleEnable = () => {
    setEnabled(true);
    setValidation("");
    setMode("thirdparty");
    setPrompt(
      'Please Identify if this URL "paste the domain here" is a third party hosting site or platform.'
    );
  };

  const handleEnablePDF = () => {
    setEnabled(true);
    setValidation("");
    setMode("pdf");
    setPrompt(
      'Please identify if this page "paste the PP URL here" is in PDF format.'
    );
  };

  const handleClear = () => {
    setPrompt("");
    setResponse("");
    setValidation("Please click a button above to enable the input field.");
    setEnabled(false);
    setMode(""); // reset active state
  };

  const fetchAIResponse = async (userPrompt) => {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: userPrompt }),
      });

      if (!res.ok) throw new Error("Failed to fetch AI response");
      const data = await res.json();
      return data.reply;
    } catch (err) {
      console.error(err);
      return "⚠️ Error connecting to AI API.";
    }
  };

  const HIDDEN_INSTRUCTION =
    "Answer either Yes or No with a brief, simple explanation.";

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setValidation("⚠️ Please enter a prompt before generating.");
      return;
    }

    setValidation("");
    setResponse("");
    setLoading(true);

    const reply = await fetchAIResponse(`${prompt}\n\n${HIDDEN_INSTRUCTION}`);
    setResponse(reply);
    setLoading(false);
  };

  return (
    <div className="container">
      <h1 className="title">AI Assistant</h1>
      <p className="subtitle">
        Type your request and press "Generate" to get a response from an AI.
      </p>

      {/* Button Group */}
      <div className="button-group">
        <button
          onClick={handleEnable}
          className={`btn-function ${mode === "thirdparty" ? "active" : ""}`}
        >
          Third Party Domain
        </button>
        <button
          onClick={handleEnablePDF}
          className={`btn-function ${mode === "pdf" ? "active" : ""}`}
        >
          PDF Format
        </button>
        <button onClick={handleClear} className="btn btn-danger">
          Clear Queries
        </button>
      </div>

      {/* Input Area */}
      <div className="input-area">
        <label htmlFor="prompt-input" className="label">
          Your Prompt
        </label>
        <textarea
          id="prompt-input"
          className="prompt-input"
          placeholder="Hi! How was your day today?"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          disabled={!enabled}
        />
        {validation && <p className="validation">{validation}</p>}
      </div>

      {/* Actions */}
      <div className="actions">
        <button
          onClick={handleGenerate}
          disabled={!enabled || loading}
          className="btn btn-primary"
        >
          {loading ? "Generating..." : "Generate"}
        </button>
        {loading && <div className="spinner"></div>}
      </div>

      {/* Response */}
      <div className="response-area">
        <h2 className="response-title">AI Response</h2>
        <div className="response-output">{response || "—"}</div>
      </div>
    </div>
  );
}

