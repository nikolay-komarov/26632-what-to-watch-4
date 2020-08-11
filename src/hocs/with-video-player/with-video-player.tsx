import * as React from "react";
import {Subtract} from "utility-types";

import {VideoPlayerMode} from "../../utils/const";
import {formatTime} from "../../utils/utils";

interface State {
  progress: number;
  videoDuration: number;
  isLoading: boolean;
  isPlaying: boolean;
}

interface InjectingProps {
  isPlaying: boolean;
  onSmallMovieCardHover: () => void; // ToDo
  onSmallMovieCardLeave: () => void; // ToDo
  onPlayButtonClick: () => void; // ToDo
  onFullScreenButtonClick: () => void; // ToDo
  getPlaybackProgress: () => number; // ToDo
  getTimeLeft: () => number; // ToDo
  onExitButtonClick: () => void; // ToDo
}

const withVideoPlayer = (Component, videoPlayerMode: string) => {
  type P = React.ComponentProps<typeof Component>;
  type T = Subtract<P, InjectingProps>

  class WithVideoPlayer extends React.PureComponent<T, State> {
    private videoRef: React.RefObject<HTMLVideoElement>;
    private videoPlayerMode: string;
    private renderVideoElement: string;


    constructor(props) {
      super(props);

      this.videoRef = React.createRef();

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

      this.videoPlayerMode = videoPlayerMode;
      this.renderVideoElement = this.setRenderVideoElement();
    }

    componentDidMount() {
      try {
        const {movieCard} = this.props;
        const video = this.videoRef.current;

        video.src = movieCard.previewVideoLink;
        video.poster = movieCard.previewImage;

        switch (this.videoPlayerMode) {
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
      } catch (error) {
        return error;
      }
      return true;
    }

    componentDidUpdate() {
      const video = this.videoRef.current;
      const {isPlaying} = this.state;

      if (isPlaying) {
        video.play();
      } else {
        switch (this.videoPlayerMode) {
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
      const video = this.videoRef.current;

      video.oncanplaythrough = null;
      video.onplay = null;
      video.onpause = null;
      video.onload = null;
      video.ontimeupdate = null;
      video.src = ``;
      video.poster = ``;
    }

    setRenderVideoElement() {
      let elementVideo;
      switch (this.videoPlayerMode) {
        case VideoPlayerMode.SMALL_MOVIE_CARD:
          elementVideo = <video width="280" height="175" ref={this.videoRef} />;
          break;
        case VideoPlayerMode.BIG_MOVIE_PLAYER:
          elementVideo = <video className="player__video" ref={this.videoRef} />;
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
      const video = this.videoRef.current;

      video.requestFullscreen();
    }

    getPlaybackProgress() {
      return String((this.state.progress / this.state.videoDuration) * 100);
    }

    getTimeLeft() {
      return formatTime(this.state.videoDuration - this.state.progress);
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
          {this.renderVideoElement}
        </Component>
      );
    }
  }

  // WithVideoPlayer.propTypes = {
  //   isPlaying: PropTypes.bool.isRequired,
  //   movieCard: PropTypes.shape({
  //     name: PropTypes.string,
  //     previewImage: PropTypes.string.isRequired,
  //     previewVideoLink: PropTypes.string.isRequired,
  //   }).isRequired,
  //   onExitButtonClick: PropTypes.func,
  // };

  return WithVideoPlayer;
};

export default withVideoPlayer;
