import type { NormalizedLandmark } from "@mediapipe/tasks-vision";

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