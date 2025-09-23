'use client';

import { useState } from 'react';
import GeneratorForm from '../components/GeneratorForm';
import MediaPreview from '../components/MediaPreview';

export default function Home() {
  const [mode, setMode] = useState('image'); // 'image' or 'video' set to 'image' by default
  const [positivePrompt, setPositivePrompt] = useState('An astronaut floating in space');
  const [negativePrompt, setNegativePrompt] = useState('');
  const [width, setWidth] = useState(1024);
  const [height, setHeight] = useState(1024);
  const [steps, setSteps] = useState(20); // default steps
  const [duration, setDuration] = useState(5); // for video
  const [generatedMedia, setGeneratedMedia] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [genTime, setGenTime] = useState(null);

  // Setting default width/height for video mode to avoid dimension errors
  const handleModeChange = (newMode) => {
    setMode(newMode);
    if (newMode === 'video') {
      setWidth(1920);
      setHeight(1080);
    } else {
      setWidth(1024);
      setHeight(1024);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setGeneratedMedia([]);
    setError(null);
    setGenTime(null);

    const start = performance.now();
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          mode,
          prompt: positivePrompt, 
          nePrompt: negativePrompt, 
          w: width, 
          h: height, 
          steps: steps,
          duration: mode === 'video' ? duration : undefined
        }),
      });

      const data = await response.json();
      console.log('API response:', data);

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }
      
      // Map mediaURL to url for MediaPreview compatibility
      const mappedMedia = (data.images || data.videos || []).map(m => ({
        ...m,
        url: m.imageURL || m.videoURL
      }));
      setGeneratedMedia(mappedMedia);

      const end = performance.now();
      setGenTime(((end - start) / 1000).toFixed(2));

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main>
      <h1>MediaForge</h1>
      {/* Tab-style mode selector */}
      <div style={{display:'flex',justifyContent:'center',marginBottom:16,gap:0}}>
        <button
          type="button"
          onClick={() => handleModeChange('image')}
          style={{
            padding: '0.7em 2.2em',
            border: 'none',
            borderTopLeftRadius: 8,
            borderBottomLeftRadius: 8,
            background: mode==='image' ? '#007bff' : '#e9ecef',
            color: mode==='image' ? '#fff' : '#333',
            fontWeight: 600,
            fontSize: '1.1em',
            cursor: 'pointer',
            transition: 'background 0.2s',
            outline: 'none',
            boxShadow: mode==='image' ? '0 2px 8px #007bff22' : 'none',
          }}
        >
          Image
        </button>
        <button
          type="button"
          onClick={() => handleModeChange('video')}
          style={{
            padding: '0.7em 2.2em',
            border: 'none',
            borderTopRightRadius: 8,
            borderBottomRightRadius: 8,
            background: mode==='video' ? '#007bff' : '#e9ecef',
            color: mode==='video' ? '#fff' : '#333',
            fontWeight: 600,
            fontSize: '1.1em',
            cursor: 'pointer',
            transition: 'background 0.2s',
            outline: 'none',
            boxShadow: mode==='video' ? '0 2px 8px #007bff22' : 'none',
          }}
        >
          Video
        </button>
      </div>
      <div>
        <MediaPreview
          media={generatedMedia}
          isLoading={isLoading}
          error={error}
          mode={mode}
        />
      </div>
      <GeneratorForm
        positivePrompt={positivePrompt}
        setPositivePrompt={setPositivePrompt}
        negativePrompt={negativePrompt}
        setNegativePrompt={setNegativePrompt}
        width={width}
        setWidth={setWidth}
        height={height}
        setHeight={setHeight}
        steps={steps}
        setSteps={setSteps}
        duration={duration}
        setDuration={setDuration}
        isLoading={isLoading}
        handleSubmit={handleSubmit}
        mode={mode}
      />
      {genTime && (
        <div style={{textAlign:'center',marginTop:16,color:'#888',fontSize:'1em'}}>
          Generation time: <b>{genTime}s</b>
        </div>
      )}
    </main>
  );
}