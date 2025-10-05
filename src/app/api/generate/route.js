import { Runware } from "@runware/sdk-js";
import { NextResponse } from "next/server";

export async function POST(request) {
  // Getting all parameters from the frontend
  const { mode = 'image', prompt, nePrompt, w, h, steps, duration } = await request.json();

  if (!prompt) {
    return NextResponse.json({ error: 'Please enter a prompt!' }, { status: 400 });
  }

  try {
    const runware = new Runware({
      apiKey: process.env.RUNWARE_API_KEY,
      shouldReconnect: true,
      globalMaxRetries: 3,
    });

    if (mode === 'video') {
      // Video inference
      const payload = {
        positivePrompt: prompt,
        model: "klingai:5@3", //hard-coding a cost-effective video model
        duration: parseInt(duration, 10) || 5,
        width: parseInt(w, 10) || 1280,
        height: parseInt(h, 10) || 720
      };
      if (nePrompt) payload.negativePrompt = nePrompt;
      const videos = await runware.videoInference(payload);
      console.log('Generated videos:', videos);
      return NextResponse.json({ videos });
    } else {
      // Image inference
      const images = await runware.requestImages({
        positivePrompt: prompt,
        negativePrompt: nePrompt,
        model: "runware:101@1", //hard-coding a cost-effective image model
        width: parseInt(w, 10) || 1024,
        height: parseInt(h, 10) || 1024,
        steps: parseInt(steps, 10) || 15
      });
      console.log('Generated images:', images);
      return NextResponse.json({ images });
    }
  } catch (error) {
    // Logging and stacking error info for debugging
    console.error('Generation failed:', error);
    return NextResponse.json({
      error: error.message || 'Failed to generate media',
      details: error.stack || error
    }, { status: 500 });
  }
}
