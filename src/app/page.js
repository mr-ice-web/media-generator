'use client';

import { useState } from 'react';
import GeneratorForm from '../components/GeneratorForm';
import MediaPreview from '../components/MediaPreview';

export default function Home() {
  const [mode, setMode] = useState('image'); // 'image' or 'video'
  const [positivePrompt, setPositivePrompt] = useState('An astronaut floating in space');
  const [negativePrompt, setNegativePrompt] = useState('');
  const [width, setWidth] = useState(1024);
  const [height, setHeight] = useState(1024);
  const [steps, setSteps] = useState(20); // default steps
  const [duration, setDuration] = useState(10); // for video
  const [generatedMedia, setGeneratedMedia] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [genTime, setGenTime] = useState(null);

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
      <h1>Runware Media Generator</h1>
      <div style={{textAlign:'center',marginBottom:16}}>
        <label style={{marginRight:16}}>
          <input type="radio" name="mode" value="image" checked={mode==='image'} onChange={()=>setMode('image')} /> Image
        </label>
        <label>
          <input type="radio" name="mode" value="video" checked={mode==='video'} onChange={()=>setMode('video')} /> Video
        </label>
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