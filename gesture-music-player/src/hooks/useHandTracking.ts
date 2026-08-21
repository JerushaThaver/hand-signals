import { useEffect, useState } from "react";
import type { HandLandmarker, NormalizedLandmark } from "@mediapipe/tasks-vision";
import { loadHandLandmarker } from "../services/mediaPipe";
import { detectGesture } from "../utils/gestureDetection.ts";
import type { Gesture } from "../utils/gestureDetection.ts";

interface HandTrackingResult {
  gesture: Gesture;
  landmarks: NormalizedLandmark[];
}

export function useHandTracking(
  video: HTMLVideoElement | null,
  enabled: boolean
) {
  const [result, setResult] =
    useState<HandTrackingResult>({
      gesture: "NONE",
      landmarks: [],
    });

  useEffect(() => {
    if (!enabled || !video) return;

    let animation = 0;
    let cancelled = false;
    let detector: HandLandmarker;
    const activeVideo = video;

    async function detectLoop() {
      detector = await loadHandLandmarker();

      if (cancelled) return;

      const render = () => {
        if (activeVideo.readyState >= 2) {
          const hands = detector.detectForVideo(
            activeVideo,
            performance.now()
          );

          const landmarks = hands.landmarks?.[0] ?? [];

          const gesture = landmarks.length
            ? detectGesture(landmarks)
            : "NONE";

          setResult({
            gesture,
            landmarks,
          });
        }

        animation =
          requestAnimationFrame(render);
      };

      render();
    }

    detectLoop();

    return () => {
      cancelled = true;
      cancelAnimationFrame(animation);
    };
  }, [video, enabled]);

  return result;
}