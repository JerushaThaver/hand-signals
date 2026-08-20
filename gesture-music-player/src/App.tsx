import {
  Activity,
  Camera,
  Hand,
  Play,
  SkipBack,
  SkipForward,
  Volume2,
} from "lucide-react";

import MusicPlayer from "./components/MusicPlayer";
import { songs } from "./data/songs";
import "./App.css";

function App() {
  return (
    <main className="app">
  
      <header className="app-header">
        <div>
          <span className="eyebrow">GESTURE CONTROLLED AUDIO</span>

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

     

      <div className="player-layout">
        {/* Music Player */}

        <MusicPlayer songs={songs} />

        {/* Gesture Panel */}
        <aside className="gesture-panel">
          {/* Panel Header */}

          <div className="panel-header">
            <span className="eyebrow">GESTURE ENGINE</span>

            <span className="waiting">
              WAITING
            </span>
          </div>

          {/* Camera */}

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

          {/* Gesture Controls */}

          <div className="gesture-list">

            {/* Play / Pause */}

            <div className="gesture-item">
              <span className="gesture-icon">
                <Play
                  size={20}
                  strokeWidth={1.8}
                />
              </span>

              <div>
                <strong>Play / Pause</strong>
                <small>Thumbs up</small>
              </div>
            </div>

            {/* Next Track */}

            <div className="gesture-item">
              <span className="gesture-icon">
                <SkipForward
                  size={20}
                  strokeWidth={1.8}
                />
              </span>

              <div>
                <strong>Next Track</strong>
                <small>Open hand</small>
              </div>
            </div>

            {/* Previous Track */}

            <div className="gesture-item">
              <span className="gesture-icon">
                <SkipBack
                  size={20}
                  strokeWidth={1.8}
                />
              </span>

              <div>
                <strong>Previous Track</strong>
                <small>Point left</small>
              </div>
            </div>

            {/* Volume */}

            <div className="gesture-item">
              <span className="gesture-icon">
                <Volume2
                  size={20}
                  strokeWidth={1.8}
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