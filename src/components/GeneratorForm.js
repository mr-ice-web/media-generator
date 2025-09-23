'use client';

export default function GeneratorForm({
  positivePrompt, setPositivePrompt,
  negativePrompt, setNegativePrompt,
  width, setWidth,
  height, setHeight,
  steps, setSteps,
  duration, setDuration,
  isLoading, handleSubmit,
  mode
}) {
  const handleFormSubmit = (event) => {
    event.preventDefault();
    handleSubmit();
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <label>
        Positive Prompt:
        <textarea
          value={positivePrompt}
          onChange={(e) => setPositivePrompt(e.target.value)}
          placeholder={mode === 'image' ? "e.g., An astronaut floating inside a giant hourglass in space" : "e.g., A serene mountain landscape at sunset"}
          required
        />
      </label>
      
      <label>
        Negative Prompt:
        <textarea
          value={negativePrompt}
          onChange={(e) => setNegativePrompt(e.target.value)}
          placeholder="e.g., ugly, distorted, blurry, low quality"
        />
      </label>

      <div className="dimension-inputs">
        <label>
          Width:
          <input
            type="number"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
          />
        </label>
        <label>
          Height:
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </label>
      </div>

      {mode === 'image' && (
        <label>
          Iterations: <b>{steps}</b>
          <input
            type="range"
            min={5}
            max={30}
            value={steps}
            onChange={e => setSteps(Number(e.target.value))}
            style={{ width: '100%' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9em', color: '#888' }}>
            <span>Faster Output (7)</span>
            <span>Higher Quality (30)</span>
          </div>
        </label>
      )}

      {mode === 'video' && (
        <label>
          Duration (seconds):
          <input
            type="number"
            min={5}
            max={10}
            value={duration}
            onChange={e => setDuration(Number(e.target.value))}
            style={{ width: '100%' }}
          />
        </label>
      )}

      <button type="submit" disabled={isLoading} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
        {isLoading && (
          <svg
            className="mr-3"
            style={{ width: 20, height: 20, marginRight: 8, animation: 'spin 1s linear infinite' }}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="#fff"
              strokeWidth="4"
              opacity="0.25"
            />
            <path
              d="M4 12a8 8 0 018-8"
              stroke="#fff"
              strokeWidth="4"
              strokeLinecap="round"
              opacity="0.75"
            />
          </svg>
        )}
        {isLoading
          ? (mode === 'image' ? 'Generating...' : 'Generating Video...')
          : (mode === 'image' ? 'Generate Image' : 'Generate Video')}
      </button>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </form>
  );
}