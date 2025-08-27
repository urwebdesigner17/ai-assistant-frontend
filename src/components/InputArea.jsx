export default function InputArea({ prompt, setPrompt, enabled, validation }) {
    return (
      <div className="input-area">
        <label htmlFor="prompt-input" className="label">
          Your Prompt
        </label>
        <textarea
          id="prompt-input"
          className="prompt-input"
          placeholder="Hi! How was your day?"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          disabled={!enabled}
        />
        {validation && <p className="validation">{validation}</p>}
      </div>
    );
  }
