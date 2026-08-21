import type { NormalizedLandmark } from "@mediapipe/tasks-vision";

export type Gesture =
  | "NONE"
  | "THUMBS_UP"
  | "OPEN_HAND"
  | "POINT_LEFT"
  | "TWO_FINGERS";

function extended(
  landmarks: NormalizedLandmark[],
  tip: number,
  pip: number
) {
  return landmarks[tip].y < landmarks[pip].y;
}

export function detectGesture(
  landmarks: NormalizedLandmark[]
): Gesture {
  const thumb =
    landmarks[4].x < landmarks[3].x;

  const index = extended(landmarks, 8, 6);
  const middle = extended(landmarks, 12, 10);
  const ring = extended(landmarks, 16, 14);
  const pinky = extended(landmarks, 20, 18);

  // 👍
  if (thumb && !index && !middle && !ring && !pinky) {
    return "THUMBS_UP";
  }

  // ✋
  if (index && middle && ring && pinky) {
    return "OPEN_HAND";
  }

  // ✌️
  if (index && middle && !ring && !pinky) {
    return "TWO_FINGERS";
  }

  // 👈
  if (index && !middle && !ring && !pinky) {
    return "POINT_LEFT";
  }

  return "NONE";
}