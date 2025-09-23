import { Runware } from "@runware/sdk-js";
import { NextResponse } from "next/server";

export async function POST(request) {
  // Get all the parameters from the frontend request
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
        model: "bytedance:1@1",
        duration: parseInt(duration, 10) || 10,
        width: parseInt(w, 10) || 1024,
        height: parseInt(h, 10) || 1024
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
        model: "runware:101@1",
        width: parseInt(w, 10) || 1024,
        height: parseInt(h, 10) || 1024,
        steps: parseInt(steps, 10) || 15
      });
      console.log('Generated images:', images);
      return NextResponse.json({ images });
    }
  } catch (error) {
    // Error information available for debugging and user feedback
    console.error('Generation failed:', error);
    return NextResponse.json({ error: error.message || 'Failed to generate media' }, { status: 500 });
  }
}
