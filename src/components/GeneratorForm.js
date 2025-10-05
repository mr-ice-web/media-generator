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

      <div className="dimension-inputs" style={{ display: 'flex', gap: '2rem', marginBottom: '0.5rem' }}>
        <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1, fontWeight: 600 }}>
          <span style={{ marginBottom: '0.2rem' }}>Width:</span>
          <select
            value={width}
            onChange={e => setWidth(Number(e.target.value))}
            style={{
              padding: '0.7rem 1.2rem',
              borderRadius: 8,
              border: '1.5px solid #ddd',
              fontSize: '1.05rem',
              background: '#f8fafc',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              transition: 'border 0.2s, box-shadow 0.2s',
              outline: 'none',
              fontFamily: 'inherit',
              marginRight: '0.5rem',
            }}
          >
            {mode === 'image' ? (
              <>
                <option value={512}>512</option>
                <option value={768}>768</option>
                <option value={1024}>1024</option>
                <option value={1280}>1280</option>
              </>
            ) : (
              <>
                <option value={640}>640</option>
                <option value={1280}>1280</option>
                <option value={1920}>1920</option>
                
              </>
            )}
          </select>
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1, fontWeight: 600 }}>
          <span style={{ marginBottom: '0.2rem' }}>Height:</span>
          <select
            value={height}
            onChange={e => setHeight(Number(e.target.value))}
            style={{
              padding: '0.7rem 1.2rem',
              borderRadius: 8,
              border: '1.5px solid #ddd',
              fontSize: '1.05rem',
              background: '#f8fafc',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              transition: 'border 0.2s, box-shadow 0.2s',
              outline: 'none',
              fontFamily: 'inherit',
              marginRight: '0.5rem',
            }}
          >
            {mode === 'image' ? (
              <>
                <option value={512}>512</option>
                <option value={768}>768</option>
                <option value={1024}>1024</option>
                <option value={1280}>1280</option>
              </>
            ) : (
              <>
                <option value={360}>360</option>
                <option value={720}>720</option>
                <option value={1080}>1080</option>
                
              </>
            )}
          </select>
        </label>
      </div>

      {mode === 'image' && (
        <label>
          Level of details: <b>{steps}</b>
          <input
            type="range"
            min={5}
            max={30}
            value={steps}
            onChange={e => setSteps(Number(e.target.value))}
            style={{ width: '100%' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9em', color: '#888' }}>
            <span>Faster Output (5)</span>
            <span>Higher Quality (30)</span>
          </div>
        </label>
      )}

      {mode === 'video' && (
        <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontWeight: 600, marginBottom: '0.5rem' }}>
          <span style={{ marginBottom: '0.2rem' }}>Duration (seconds):</span>
          <select
            value={duration}
            onChange={e => setDuration(Number(e.target.value))}
            style={{
              padding: '0.7rem 1.2rem',
              borderRadius: 8,
              border: '1.5px solid #ddd',
              fontSize: '1.05rem',
              background: '#f8fafc',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              transition: 'border 0.2s, box-shadow 0.2s',
              outline: 'none',
              fontFamily: 'inherit',
              marginRight: '0.5rem',
              width: '100%',
            }}
          >
            <option value={5}>5</option>
            <option value={6}>6</option>
            <option value={7}>7</option>
            <option value={8}>8</option>
          </select>
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