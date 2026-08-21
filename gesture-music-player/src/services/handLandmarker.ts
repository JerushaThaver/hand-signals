import {
  FilesetResolver,
  HandLandmarker,
} from "@mediapipe/tasks-vision";

let handLandmarker: HandLandmarker | null = null;

export async function getHandLandmarker() {
  if (handLandmarker) {
    return handLandmarker;
  }

  const vision = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.22/wasm"
  );

  handLandmarker = await HandLandmarker.createFromOptions(
    vision,
    {
      baseOptions: {
        modelAssetPath: "/models/hand_landmarker.task",
        delegate: "GPU",
      },

      runningMode: "VIDEO",

      numHands: 1,

      minHandDetectionConfidence: 0.5,

      minHandPresenceConfidence: 0.5,

      minTrackingConfidence: 0.5,
    }
  );

  return handLandmarker;
}