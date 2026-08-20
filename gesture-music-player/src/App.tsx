import { Camera } from "lucide-react";

import MusicPlayer from "./components/MusicPlayer";
import GestureIcon from "./components/GestureIcon";
import { songs } from "./data/songs";
import "./App.css";

function App() {
  return (
    <main className="app">

      {/* ================================
          HEADER
      ================================= */}

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

        {/* System Status */}

        <div className="status">
          <span className="status-dot"></span>
          SYSTEM ONLINE
        </div>
      </header>

      {/* ================================
          MAIN CONTENT
      ================================= */}

      <div className="player-layout">

        {/* Music Player */}

        <MusicPlayer songs={songs} />

        {/* ================================
            GESTURE PANEL
        ================================= */}

        <aside className="gesture-panel">

          {/* Panel Header */}

          <div className="panel-header">
            <span className="eyebrow">
              GESTURE ENGINE
            </span>

            <span className="waiting">
              WAITING
            </span>
          </div>

          {/* ================================
              CAMERA
          ================================= */}

          <div className="camera-placeholder">

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

          </div>

          {/* ================================
              GESTURE CONTROLS
          ================================= */}

          <div className="gesture-list">

            {/* Thumbs Up */}

            <div className="gesture-item">

              <span className="gesture-icon">
                <GestureIcon gesture="thumbs-up" />
              </span>

              <div>
                <strong>Play / Pause</strong>
                <small>Thumbs up</small>
              </div>

            </div>

            {/* Open Hand */}

            <div className="gesture-item">

              <span className="gesture-icon">
                <GestureIcon gesture="open-hand" />
              </span>

              <div>
                <strong>Next Track</strong>
                <small>Open hand</small>
              </div>

            </div>

            {/* Point Left */}

            <div className="gesture-item">

              <span className="gesture-icon">
                <GestureIcon gesture="point-left" />
              </span>

              <div>
                <strong>Previous Track</strong>
                <small>Point left</small>
              </div>

            </div>

            {/* Two Fingers */}

            <div className="gesture-item">

              <span className="gesture-icon">
                <GestureIcon gesture="two-fingers" />
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