import React, {PureComponent, createRef} from "react";
import PropTypes from "prop-types";

import {VideoPlayerMode} from "../../utils/const.js";
import {formatTime} from "../../utils/utils.js";

const withVideoPlayer = (Component, videoPlayerMode) => {
  class WithVideoPlayer extends PureComponent {
    constructor(props) {
      super(props);

      this._videoRef = createRef();

      this.state = {
        progress: 0,
        videoDuration: 0,
        isLoading: true,
        isPlaying: this.props.isPlaying,
      };

      this.handleSmallMovieCardHover = this.handleSmallMovieCardHover.bind(this);
      this.handleSmallMovieCardLeave = this.handleSmallMovieCardLeave.bind(this);

      this.handlePlayButtonClick = this.handlePlayButtonClick.bind(this);
      this.handleFullScreenButtonClick = this.handleFullScreenButtonClick.bind(this);
      this.getPlaybackProgress = this.getPlaybackProgress.bind(this);
      this.getTimeLeft = this.getTimeLeft.bind(this);

      this._videoPlayerMode = videoPlayerMode;
      this._renderVideoElement = this.setRenderVideoElement();
    }

    setRenderVideoElement() {
      let elementVideo;
      switch (this._videoPlayerMode) {
        case VideoPlayerMode.SMALL_MOVIE_CARD:
          elementVideo = <video width="280" height="175" ref={this._videoRef} />;
          break;
        case VideoPlayerMode.BIG_MOVIE_PLAYER:
          elementVideo = <video className="player__video" ref={this._videoRef} />;
          break;
      }

      return elementVideo;
    }

    handleSmallMovieCardHover() {
      this.setState({isPlaying: true});
    }

    handleSmallMovieCardLeave() {
      this.setState({isPlaying: false});
    }

    handlePlayButtonClick() {
      this.setState({isPlaying: !this.state.isPlaying});
    }

    handleFullScreenButtonClick() {
      const video = this._videoRef.current;

      video.requestFullscreen();
    }

    getPlaybackProgress() {
      return String((this.state.progress / this.state.videoDuration) * 100);
    }

    getTimeLeft() {
      return formatTime(this.state.videoDuration - this.state.progress);
    }

    componentDidMount() {
      const {movieCard} = this.props;
      const video = this._videoRef.current;

      video.src = movieCard.previewVideoLink;
      video.poster = movieCard.previewImage;

      switch (this._videoPlayerMode) {
        case VideoPlayerMode.SMALL_MOVIE_CARD:
          video.muted = true;
          break;
        case VideoPlayerMode.BIG_MOVIE_PLAYER:
          video.muted = false;
          break;
      }

      video.oncanplaythrough = () => this.setState({isLoading: false});
      video.onplay = () => this.setState({isPlaying: true});
      video.onpause = () => this.setState({isPlaying: false});
      video.onload = () => this.setState({isPlaying: false});
      video.onloadedmetadata = () => this.setState({videoDuration: Math.floor(video.duration)});
      video.ontimeupdate = () => this.setState({progress: video.currentTime});
    }

    componentDidUpdate() {
      const video = this._videoRef.current;
      const {isPlaying} = this.state;

      if (isPlaying) {
        video.play();
      } else {
        switch (this._videoPlayerMode) {
          case VideoPlayerMode.SMALL_MOVIE_CARD:
            video.load();
            break;
          case VideoPlayerMode.BIG_MOVIE_PLAYER:
            video.pause();
            break;
        }
      }
    }

    componentWillUnmount() {
      const video = this._videoRef.current;

      video.oncanplaythrough = null;
      video.onplay = null;
      video.onpause = null;
      video.onload = null;
      video.ontimeupdate = null;
      video.src = ``;
      video.poster = ``;
    }

    render() {
      return (
        <Component
          {...this.props}

          isPlaying = {this.state.isPlaying}

          onSmallMovieCardHover = {this.handleSmallMovieCardHover}
          onSmallMovieCardLeave = {this.handleSmallMovieCardLeave}

          onPlayButtonClick = {this.handlePlayButtonClick}
          onFullScreenButtonClick = {this.handleFullScreenButtonClick}
          getPlaybackProgress = {this.getPlaybackProgress}
          getTimeLeft = {this.getTimeLeft}
          onExitButtonClick = {this.props.onExitButtonClick}
        >
          {this._renderVideoElement}
        </Component>
      );
    }
  }

  WithVideoPlayer.propTypes = {
    isPlaying: PropTypes.bool.isRequired,
    movieCard: PropTypes.shape({
      name: PropTypes.string,
      previewImage: PropTypes.string.isRequired,
      previewVideoLink: PropTypes.string.isRequired,
    }).isRequired,
    onExitButtonClick: PropTypes.func,
  };

  return WithVideoPlayer;
};

export default withVideoPlayer;
