import { useEffect, useRef, useState } from "react";
import { Camera, CameraOff } from "lucide-react";

import MusicPlayer from "./components/MusicPlayer";
import { songs } from "./data/songs";

import thumbsUpIcon from "./assets/gestures/thumbs-up.svg";
import openHandIcon from "./assets/gestures/open-hand.svg";
import pointLeftIcon from "./assets/gestures/point-left.svg";
import twoFingersIcon from "./assets/gestures/two-fingers.svg";

import "./App.css";

function App() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [cameraEnabled, setCameraEnabled] = useState(false);
  const [cameraError, setCameraError] = useState("");

  const enableCamera = async () => {
    setCameraError("");

    try {
      // Ask the browser for webcam access
      const stream = await navigator.mediaDevices.getUserMedia({
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
        videoRef.current.srcObject = stream;

        await videoRef.current.play();
      }

      setCameraEnabled(true);
    } catch (error) {
      console.error("Camera access error:", error);

      if (error instanceof DOMException) {
        if (error.name === "NotAllowedError") {
          setCameraError(
            "Camera permission was denied. Please allow camera access in your browser."
          );
        } else if (error.name === "NotFoundError") {
          setCameraError(
            "No camera was found. Please connect a webcam and try again."
          );
        } else {
          setCameraError(
            "Unable to access the camera. Please check your browser settings."
          );
        }
      } else {
        setCameraError("Something went wrong while accessing the camera.");
      }

      setCameraEnabled(false);
    }
  };

  const disableCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        track.stop();
      });

      streamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setCameraEnabled(false);
  };

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => {
          track.stop();
        });
      }
    };
  }, []);

  return (
    <main className="app">

      {/* HEADER */}
      <header className="app-header">
        <div>
          <span className="eyebrow">
            GESTURE CONTROLLED AUDIO
          </span>

          <h1>
            Gesture<span>Player</span>
          </h1>

          <p>
            Control your music using nothing but your hands.
          </p>
        </div>

        <div className="status">
          <span className="status-dot"></span>
          SYSTEM ONLINE
        </div>
      </header>


      {/* MAIN CONTENT */}
      <div className="player-layout">

        <MusicPlayer songs={songs} />


        {/* GESTURE PANEL */}
        <aside className="gesture-panel">

          <div className="panel-header">
            <span className="eyebrow">
              GESTURE ENGINE
            </span>

            <span
              className={`waiting ${
                cameraEnabled ? "camera-active" : ""
              }`}
            >
              {cameraEnabled ? "ACTIVE" : "WAITING"}
            </span>
          </div>


          {/* CAMERA */}
          <div
            className={`camera-placeholder ${
              cameraEnabled ? "camera-enabled" : ""
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
                  Your camera will appear here once
                  gesture recognition is enabled.
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

                    <span>{cameraError}</span>
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

                <div className="camera-overlay">

                  <div className="camera-live">
                    <span className="live-dot"></span>
                    CAMERA LIVE
                  </div>

                  <button
                    className="disable-camera-button"
                    onClick={disableCamera}
                  >
                    <CameraOff size={17} />

                    TURN OFF
                  </button>

                </div>
              </>
            )}

          </div>


          {/* GESTURES */}
          <div className="gesture-list">

            <div className="gesture-item">
              <span className="gesture-icon">
                <img
                  src={thumbsUpIcon}
                  alt="Thumbs up gesture"
                />
              </span>

              <div>
                <strong>Play / Pause</strong>
                <small>Thumbs up</small>
              </div>
            </div>


            <div className="gesture-item">
              <span className="gesture-icon">
                <img
                  src={openHandIcon}
                  alt="Open hand gesture"
                />
              </span>

              <div>
                <strong>Next Track</strong>
                <small>Open hand</small>
              </div>
            </div>


            <div className="gesture-item">
              <span className="gesture-icon">
                <img
                  src={pointLeftIcon}
                  alt="Point left gesture"
                />
              </span>

              <div>
                <strong>Previous Track</strong>
                <small>Point left</small>
              </div>
            </div>


            <div className="gesture-item">
              <span className="gesture-icon">
                <img
                  src={twoFingersIcon}
                  alt="Two fingers gesture"
                />
              </span>

              <div>
                <strong>Volume</strong>
                <small>Two fingers</small>
              </div>
            </div>

          </div>

        </aside>

      </div>

    </main>
  );
}

export default App;