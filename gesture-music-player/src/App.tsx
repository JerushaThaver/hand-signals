<<<<<<< Updated upstream
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Get started</h1>
          <p>
            Edit <code>src/App.tsx</code> and save to test <code>HMR</code>
          </p>
=======
import { useEffect, useRef, useState } from "react";
import { Camera, CameraOff } from "lucide-react";

import MusicPlayer from "./components/MusicPlayer";
import { songs } from "./data/songs";

import { useHandTracking } from "./hooks/useHandTracking";
import thumbsUpIcon from "./assets/gestures/thumbs-up.svg";
import openHandIcon from "./assets/gestures/open-hand.svg";
import pointLeftIcon from "./assets/gestures/point-left.svg";
import twoFingersIcon from "./assets/gestures/two-fingers.svg";

import "./App.css";

function App() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [cameraEnabled, setCameraEnabled] = useState(false);
  const [videoElement, setVideoElement] =
    useState<HTMLVideoElement | null>(null);
  const [cameraError, setCameraError] = useState("");
  const { gesture, landmarks } = useHandTracking(
    videoElement,
    cameraEnabled,
  );

  useEffect(() => {
    if (!canvasRef.current || !videoRef.current) {
      return;
    }

    const canvas = canvasRef.current;
    const video = videoRef.current;

    if (video.videoWidth === 0 || video.videoHeight === 0) {
      return;
    }

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (landmarks.length === 0) {
      return;
    }

    ctx.fillStyle = "#00E5FF";

    landmarks.forEach((point) => {
      ctx.beginPath();
      ctx.arc(
        point.x * canvas.width,
        point.y * canvas.height,
        4,
        0,
        Math.PI * 2,
      );
      ctx.fill();
    });

    ctx.strokeStyle = "#00E5FF";
    ctx.lineWidth = 2;

    const connections = [
      [0, 1], [1, 2], [2, 3], [3, 4],
      [0, 5], [5, 6], [6, 7], [7, 8],
      [5, 9], [9, 10], [10, 11], [11, 12],
      [9, 13], [13, 14], [14, 15], [15, 16],
      [13, 17], [17, 18], [18, 19], [19, 20],
      [0, 17],
    ];

    connections.forEach(([a, b]) => {
      ctx.beginPath();
      ctx.moveTo(
        landmarks[a].x * canvas.width,
        landmarks[a].y * canvas.height,
      );
      ctx.lineTo(
        landmarks[b].x * canvas.width,
        landmarks[b].y * canvas.height,
      );
      ctx.stroke();
    });
  }, [landmarks]);

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
      setCameraEnabled(true);
    } catch (error) {
      console.error("Camera access error:", error);

      if (error instanceof DOMException) {
        if (error.name === "NotAllowedError") {
          setCameraError(
            "Camera permission was denied. Please allow camera access in your browser.",
          );
        } else if (error.name === "NotFoundError") {
          setCameraError(
            "No camera was found. Please connect a webcam and try again.",
          );
        } else {
          setCameraError(
            "Unable to access the camera. Please check your browser settings.",
          );
        }
      } else {
        setCameraError("Something went wrong while accessing the camera.");
      }

      setCameraEnabled(false);
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    const stream = streamRef.current;

    if (!cameraEnabled || !video || !stream) {
      return;
    }

    video.srcObject = stream;
    setVideoElement(video);
    void video.play();
  }, [cameraEnabled]);

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

    setVideoElement(null);
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
          <span className="eyebrow">GESTURE CONTROLLED AUDIO</span>

          <h1>
            Gesture<span>Player</span>
          </h1>

          <p>Control your music using nothing but your hands.</p>
>>>>>>> Stashed changes
        </div>
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
<<<<<<< Updated upstream
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
=======
      </header>

      {/* MAIN CONTENT */}
      <div className="player-layout">
        <MusicPlayer songs={songs} />

        {/* GESTURE PANEL */}
        <aside className="gesture-panel">
          <div className="panel-header">
            <span className="eyebrow">GESTURE ENGINE</span>

            <span className={`waiting ${cameraEnabled ? "camera-active" : ""}`}>
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
                  <Camera size={52} strokeWidth={1.4} />
                </div>

                <h2>Camera Ready</h2>

                <p>
                  Your camera will appear here once gesture recognition is
                  enabled.
                </p>

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
              </>
            ) : (
              <>
                <div className="camera-feed">
                  <video
                    ref={videoRef}
                    className="camera-video"
                    autoPlay
                    playsInline
                    muted
                  />

                  <canvas ref={canvasRef} className="camera-canvas" />
                </div>
                <div className="camera-overlay">
                  <div className="gesture-live-status">
                    <span>Detected Gesture</span>

                    <strong>{gesture.replace("_", " ")}</strong>
                  </div>
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
                <img src={thumbsUpIcon} alt="Thumbs up gesture" />
              </span>

              <div>
                <strong>Play / Pause</strong>
                <small>Thumbs up</small>
              </div>
            </div>

            <div className="gesture-item">
              <span className="gesture-icon">
                <img src={openHandIcon} alt="Open hand gesture" />
              </span>

              <div>
                <strong>Next Track</strong>
                <small>Open hand</small>
              </div>
            </div>

            <div className="gesture-item">
              <span className="gesture-icon">
                <img src={pointLeftIcon} alt="Point left gesture" />
              </span>

              <div>
                <strong>Previous Track</strong>
                <small>Point left</small>
              </div>
            </div>

            <div className="gesture-item">
              <span className="gesture-icon">
                <img src={twoFingersIcon} alt="Two fingers gesture" />
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
>>>>>>> Stashed changes
