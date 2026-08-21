import {
  useEffect,
  useRef,
  useState,
} from "react";

import { Camera, CameraOff } from "lucide-react";

import { useHandTracking } from "../hooks/useHandTracking";

export default function GestureCamera() {
  const videoRef =
    useRef<HTMLVideoElement | null>(null);

  const canvasRef =
    useRef<HTMLCanvasElement | null>(null);

  const streamRef =
    useRef<MediaStream | null>(null);

  const [cameraEnabled, setCameraEnabled] =
    useState(false);

  const [cameraError, setCameraError] =
    useState("");

  const {
    handDetected,
    loading: trackingLoading,
    error: trackingError,
  } = useHandTracking({
    enabled: cameraEnabled,
    videoRef,
    canvasRef,
  });

  async function enableCamera() {
    setCameraError("");

    try {
      const stream =
        await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: "user",
            width: {
              ideal: 1280,
            },
            height: {
              ideal: 720,
            },
          },
          audio: false,
        });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject =
          stream;

        await videoRef.current.play();

        /*
         * Match canvas resolution to the
         * actual video resolution.
         */
        if (canvasRef.current) {
          canvasRef.current.width =
            videoRef.current.videoWidth;

          canvasRef.current.height =
            videoRef.current.videoHeight;
        }
      }

      setCameraEnabled(true);
    } catch (error) {
      console.error(
        "Camera access error:",
        error
      );

      if (error instanceof DOMException) {
        if (
          error.name ===
          "NotAllowedError"
        ) {
          setCameraError(
            "Camera permission was denied."
          );
        } else if (
          error.name ===
          "NotFoundError"
        ) {
          setCameraError(
            "No camera was found."
          );
        } else {
          setCameraError(
            "Unable to access the camera."
          );
        }
      } else {
        setCameraError(
          "Something went wrong while accessing the camera."
        );
      }
    }
  }

  function disableCamera() {
    streamRef.current
      ?.getTracks()
      .forEach((track) => {
        track.stop();
      });

    streamRef.current = null;

    if (videoRef.current) {
      videoRef.current.srcObject =
        null;
    }

    setCameraEnabled(false);
  }

  useEffect(() => {
    return () => {
      streamRef.current
        ?.getTracks()
        .forEach((track) => {
          track.stop();
        });
    };
  }, []);

  return (
    <div
      className={`camera-placeholder ${
        cameraEnabled
          ? "camera-enabled"
          : ""
      }`}
    >
      {!cameraEnabled ? (
        <>
          <div className="camera-icon">
            <Camera
              size={52}
              strokeWidth={1.4}
            />
          </div>

          <h2>Camera Ready</h2>

          <p>
            Enable your camera to begin
            hand tracking.
          </p>

          <button
            className="camera-button"
            onClick={enableCamera}
          >
            <Camera size={18} />

            ENABLE CAMERA
          </button>

          {cameraError && (
            <div className="camera-error">
              <CameraOff size={17} />

              <span>
                {cameraError}
              </span>
            </div>
          )}
        </>
      ) : (
        <>
          <video
            ref={videoRef}
            className="camera-video"
            autoPlay
            playsInline
            muted
          />

          <canvas
            ref={canvasRef}
            className="hand-skeleton"
          />

          <div className="camera-overlay">
            <div className="camera-live">
              <span className="live-dot" />

              CAMERA LIVE
            </div>

            <div className="hand-status">
              <span
                className={
                  handDetected
                    ? "status-indicator detected"
                    : "status-indicator"
                }
              />

              {handDetected
                ? "HAND DETECTED"
                : "SEARCHING"}
            </div>

            <button
              className="disable-camera-button"
              onClick={disableCamera}
            >
              <CameraOff size={17} />

              TURN OFF
            </button>
          </div>

          {trackingLoading && (
            <div className="tracking-message">
              Loading hand tracking...
            </div>
          )}

          {trackingError && (
            <div className="tracking-message error">
              {trackingError}
            </div>
          )}
        </>
      )}
    </div>
  );
}