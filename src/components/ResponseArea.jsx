export default function ResponseArea({ response }) {
    return (
      <div className="response-area">
        <h2 className="response-title">AI Response</h2>
        <div className="response-output">{response || "—"}</div>
      </div>
    );
  }
