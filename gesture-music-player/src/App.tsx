import MusicPlayer from "./components/MusicPlayer";
import GestureCamera from "./components/GestureCamera";
import { songs } from "./data/songs";

import thumbsUpIcon from "./assets/gestures/thumbs-up.svg";
import openHandIcon from "./assets/gestures/open-hand.svg";
import pointLeftIcon from "./assets/gestures/point-left.svg";
import twoFingersIcon from "./assets/gestures/two-fingers.svg";

import "./App.css";

function App() {
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

            <span className="waiting">
              WAITING
            </span>
          </div>

          <GestureCamera />

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