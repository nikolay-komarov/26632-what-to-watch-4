import * as React from "react";
import {Link} from "react-router-dom";
import {AppRoute} from "../../utils/const";

import {
  MovieType,
} from "../../types";

interface Props {
  movieCard: MovieType;
  isPlaying: boolean;
  onPlayButtonClick: () => void;
  onFullScreenButtonClick: () => void;
  getPlaybackProgress: () => number;
  getTimeLeft: () => number;
  children: React.ReactNode;
}

const BigVideoPlayer: React.FC<Props> = (props: Props) => {
  const {
    movieCard,
    isPlaying,
    onPlayButtonClick,
    onFullScreenButtonClick,
    getPlaybackProgress,
    getTimeLeft,
    children,
  } = props;

  return (
    <div className="player">
      {children}

      <Link
        type="button"
        className="player__exit"
        to={`${AppRoute.FILM}/${movieCard.id}`}
      >
        Exit
      </Link>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress
              className="player__progress"
              value={getPlaybackProgress()}
              max="100"
            />
            <div
              className="player__toggler"
              style={{left: `${getPlaybackProgress()}%`}}
            >
              Toggler
            </div>
          </div>
          <div className="player__time-value">{getTimeLeft()}</div>
        </div>

        <div className="player__controls-row">
          <button
            type="button"
            className="player__play"
            onClick={onPlayButtonClick}
          >
            {isPlaying ? (
              <>
                <svg viewBox="0 0 14 21" width="14" height="21">
                  <use xlinkHref="#pause"></use>
                </svg>
                <span>Pause</span>
              </>
            ) : (
              <>
                <svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlinkHref="#play-s" />
                </svg>
                <span>Play</span>
              </>
            )}
          </button>
          <div className="player__name">{movieCard.name}</div>

          <button
            type="button"
            className="player__full-screen"
            onClick={onFullScreenButtonClick}
          >
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen" />
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BigVideoPlayer;
