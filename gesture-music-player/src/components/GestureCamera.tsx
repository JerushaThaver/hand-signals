import { useEffect, useRef, useState } from "react";
import { Camera, CameraOff } from "lucide-react";
import { useHandTracking } from "../hooks/useHandTracking";

export default function GestureCamera() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const [cameraError, setCameraError] = useState("");

  const {
    handDetected,
    loading: trackingLoading,
    error: trackingError,
  } = useHandTracking({ enabled: cameraEnabled, videoRef, canvasRef });

  function handleVideoLoadedMetadata() {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
  }

  async function enableCamera() {
    setCameraError("");

    try {
      if (!navigator.mediaDevices?.getUserMedia) {
        setCameraError("Camera access is not supported by this browser.");
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });

      streamRef.current = stream;
      const video = videoRef.current;

      if (!video) {
        stream.getTracks().forEach((track) => track.stop());
        setCameraError("Camera video element could not be initialized.");
        return;
      }

      video.srcObject = stream;
      await video.play();
      handleVideoLoadedMetadata();
      setCameraEnabled(true);
    } catch (error) {
      console.error("Camera access error:", error);

      if (error instanceof DOMException) {
        const messages: Record<string, string> = {
          NotAllowedError: "Camera permission was denied. Please allow camera access in your browser.",
          NotFoundError: "No camera was found on this device.",
          NotReadableError: "The camera is already being used by another application.",
          OverconstrainedError: "The requested camera settings are not supported.",
          SecurityError: "Camera access was blocked for security reasons.",
        };
        setCameraError(messages[error.name] ?? `Unable to access the camera (${error.name}).`);
      } else {
        setCameraError("Something went wrong while accessing the camera.");
      }
    }
  }

  function disableCamera() {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;

    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.srcObject = null;
    }

    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (canvas && context) {
      context.clearRect(0, 0, canvas.width, canvas.height);
    }

    setCameraEnabled(false);
  }

  useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  return (
    <div className={`camera-placeholder ${cameraEnabled ? "camera-enabled" : ""}`}>
      <video
        ref={videoRef}
        className={`camera-video ${cameraEnabled ? "camera-video-visible" : "camera-video-hidden"}`}
        autoPlay
        playsInline
        muted
        onLoadedMetadata={handleVideoLoadedMetadata}
      />

      <canvas ref={canvasRef} className="hand-skeleton" />

      {!cameraEnabled && (
        <div className="camera-ready-content">
          <div className="camera-icon">
            <Camera size={52} strokeWidth={1.4} />
          </div>
          <h2>Camera Ready</h2>
          <p>Enable your camera to begin hand tracking.</p>
          <button className="camera-button" onClick={enableCamera}>
            <Camera size={18} />
            ENABLE CAMERA
          </button>
          {cameraError && (
            <div className="camera-error">
              <CameraOff size={17} />
              <span>{cameraError}</span>
            </div>
          )}
        </div>
      )}

      {cameraEnabled && (
        <>
          <div className="camera-overlay">
            <div className="camera-live">
              <span className="live-dot" />
              CAMERA LIVE
            </div>
            <button className="disable-camera-button" onClick={disableCamera}>
              <CameraOff size={17} />
              TURN OFF
            </button>
          </div>

          <div className="hand-status">
            <span className={handDetected ? "status-indicator detected" : "status-indicator"} />
            {handDetected ? "HAND DETECTED" : "SEARCHING"}
          </div>

          {trackingLoading && <div className="tracking-message">Loading hand tracking...</div>}
          {trackingError && <div className="tracking-message error">{trackingError}</div>}
        </>
      )}
    </div>
  );
}
