import { useEffect, useState, type RefObject } from "react";
import type { NormalizedLandmark } from "@mediapipe/tasks-vision";

import { getHandLandmarker } from "../services/handLandmarker";

interface UseHandTrackingOptions {
  enabled: boolean;
  videoRef: RefObject<HTMLVideoElement | null>;
  canvasRef: RefObject<HTMLCanvasElement | null>;
}

const connections = [
  // Thumb
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],

  // Index finger
  [0, 5],
  [5, 6],
  [6, 7],
  [7, 8],

  // Middle finger
  [5, 9],
  [9, 10],
  [10, 11],
  [11, 12],

  // Ring finger
  [9, 13],
  [13, 14],
  [14, 15],
  [15, 16],

  // Pinky
  [13, 17],
  [17, 18],
  [18, 19],
  [19, 20],

  // Palm
  [0, 17],
];

export function drawHandSkeleton(
  ctx: CanvasRenderingContext2D,
  landmarks: NormalizedLandmark[],
  width: number,
  height: number
) {
  ctx.clearRect(0, 0, width, height);

  /*
   * Draw bones
   */
  ctx.strokeStyle = "rgba(255, 255, 255, 0.75)";
  ctx.lineWidth = 2;

  for (const [startIndex, endIndex] of connections) {
    const start = landmarks[startIndex];
    const end = landmarks[endIndex];

    ctx.beginPath();

    ctx.moveTo(
      start.x * width,
      start.y * height
    );

    ctx.lineTo(
      end.x * width,
      end.y * height
    );

    ctx.stroke();
  }

  /*
   * Draw joints
   */
  for (const landmark of landmarks) {
    const x = landmark.x * width;
    const y = landmark.y * height;

    ctx.beginPath();

    ctx.arc(x, y, 4, 0, Math.PI * 2);

    ctx.fillStyle = "#ffffff";

    ctx.fill();
  }
}

export function useHandTracking({
  enabled,
  videoRef,
  canvasRef,
}: UseHandTrackingOptions) {
  const [handDetected, setHandDetected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!enabled) {
      return;
    }

    let animationFrameId = 0;
    let cancelled = false;

    async function startTracking() {
      setLoading(true);
      setError("");

      try {
        const landmarker = await getHandLandmarker();

        if (cancelled) return;

        setLoading(false);

        const detectFrame = () => {
          if (cancelled) return;

          const video = videoRef.current;
          const canvas = canvasRef.current;

          if (video && canvas && video.readyState >= 2) {
            const context = canvas.getContext("2d");

            if (context) {
              if (
                canvas.width !== video.videoWidth ||
                canvas.height !== video.videoHeight
              ) {
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
              }

              const results = landmarker.detectForVideo(
                video,
                performance.now()
              );
              const landmarks = results.landmarks[0];

              if (landmarks) {
                setHandDetected(true);
                drawHandSkeleton(
                  context,
                  landmarks,
                  canvas.width,
                  canvas.height
                );
              } else {
                setHandDetected(false);
                context.clearRect(
                  0,
                  0,
                  canvas.width,
                  canvas.height
                );
              }
            }
          }

          animationFrameId = requestAnimationFrame(detectFrame);
        };

        detectFrame();
      } catch (trackingError) {
        if (cancelled) return;

        console.error("Hand tracking error:", trackingError);
        setLoading(false);
        setError("Unable to load hand tracking.");
      }
    }

    void startTracking();

    return () => {
      cancelled = true;
      cancelAnimationFrame(animationFrameId);
    };
  }, [enabled, videoRef, canvasRef]);

  return {
    handDetected: enabled && handDetected,
    loading: enabled && loading,
    error: enabled ? error : "",
  };
}