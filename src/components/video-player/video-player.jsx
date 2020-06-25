import React, {PureComponent, createRef} from "react";
import PropTypes from "prop-types";

class VideoPlayer extends PureComponent {
  constructor(props) {
    super(props);

    this._videoRef = createRef();

    this.state = {
      proress: 0,
      isLoading: true,
      isPlaying: props.isPlaying,
    };
  }

  componentDidMount() {
    const {movieCard} = this.props;
    const video = this._videoRef.current;

    video.src = movieCard.previewVideoLink;
    video.poster = movieCard.previewImage;
    video.muted = true;

    video.oncanplaythrough = () => this.setState({isLoading: false});
    video.onplay = () => this.setState({isPlaying: true});
    video.onpause = () => this.setState({isPlaying: false});
    video.onload = () => this.setState({isPlaying: false});
    video.ontimeupdate = () => this.setState({progress: video.currentTime});
  }

  componentDidUpdate() {
    const video = this._videoRef.current;
    const {isPlaying} = this.props;

    if (isPlaying) {
      video.play();
    } else {
      video.load();
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
    return <video width="280" height="175" ref={this._videoRef} />;
  }
}

VideoPlayer.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  movieCard: PropTypes.shape({
    previewImage: PropTypes.string.isRequired,
    previewVideoLink: PropTypes.string.isRequired,
  }).isRequired,
};

export default VideoPlayer;
