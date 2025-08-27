export default function Actions({ handleGenerate, enabled, loading }) {
    return (
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
    );
  }
