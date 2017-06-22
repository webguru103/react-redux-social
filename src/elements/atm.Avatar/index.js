import React, { PropTypes, Component } from 'react';

import filepicker from 'filepicker-js';
import Wrapper from './Wrapper';

class PPAvatar extends Component {
  constructor(props) {
    super(props);

    this.openFilePicker = this.openFilePicker.bind(this);
    const avatarColor = ['#F27E39', '#B4ED50', '#30D0AA', '#67C5E7', '#B171B6', '#E35A88', '#E22424', '#778CDF', '#F0DB09', '#8FBEA4'];

    this.state = {
      avatar: this.props.image,
      avatarNew: '',
      avatarKey: '',
      filePickerKey: this.props.filePickerKey,
      backgroundColor: this.props.backgroundColor ? this.props.backgroundColor : avatarColor[Math.floor(Math.random() * 10)],
      previousProps: props,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.previousProps !== nextProps) {
      this.setState({
        avatar: nextProps.image,
        filePickerKey: nextProps.filePickerKey,
        backgroundColor: nextProps.backgroundColor ? nextProps.backgroundColor : this.state.backgroundColor,
        previousProps: nextProps,
      });
    }
  }

  openFilePicker() {
    this.setState({
      open: false,
    });

    const tthis = this;
    filepicker.setKey(this.props.filePickerKey);
    const filePickerOptions = {
      mimetype: 'image/*',
      cropRatio: 1 / 1,
      buttonText: 'Choose',
      container: 'modal',
      multiple: false,
      maxFiles: 1,
      imageQuality: 80,
      imageMax: [1200, 1200],
      services: ['CONVERT', 'COMPUTER', 'WEBCAM', 'IMAGE_SEARCH', 'FLICKR', 'GOOGLE_DRIVE', 'FACEBOOK', 'INSTAGRAM', 'BOX', 'SKYDRIVE', 'URL'],
      conversions: ['crop', 'rotate', 'filter'],
    };

    const fileStoreOptions = {
      location: 'S3',
    };

    const uploadSuccess = function (Blobs) {
      tthis.props.getAvatarandColor(Blobs[0].key, tthis.state.backgroundColor);
      tthis.setState({
        avatarNew: Blobs[0].url,
        avatarKey: Blobs[0].key,
      });
    };

    const uploadFail = function () {
      tthis.setState({
        avatarKey: '',
      });
    };

    const uploadProgress = function (progress) {
      console.log(JSON.stringify(progress));
    };

    filepicker.pickAndStore(
      filePickerOptions,
      fileStoreOptions,
      uploadSuccess,
      uploadFail,
      uploadProgress,
    );
  }

  render() {
    const { isClickable } = this.props;
    const title = this.props.title || '';
    const avatar = this.state.avatarNew ? this.state.avatarNew : this.state.avatar;
    const blankAvatar = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';

    const style = {
      image: {
        width: this.props.size,
        height: this.props.size,
        borderRadius: `${this.props.radius}%`,
        background: this.state.backgroundColor,
      },
      initial: {
        color: 'white',
        fontSize: this.props.size / 2,
        lineHeight: `${this.props.size / 2}px`,
        marginTop: this.props.size / 4,
        marginBottom: this.props.size / 4,
        textTransform: 'uppercase',
      },
    };

    return (
      <Wrapper>
        { this.props.header && <h6>{this.props.header}</h6> }
        <div className={['avatar-photo', this.props.className].join(' ')} style={style.image} onClick={isClickable && this.openFilePicker} type="button">
          <img src={avatar || blankAvatar} alt="avatar" />
          { avatar
            ? null
            : <div className="avatar-initial">
              <h4 style={style.initial}>{title.substr(0, 2)}</h4>
            </div>
          }
          { this.props.filePickerKey
            ? <div className="avatar-txt">
              <i className="fa fa-camera"></i>
              <p>Update Your <br /> Profile Photo</p>
            </div>
            : null
          }
        </div>
      </Wrapper>
    );
  }
}

PPAvatar.propTypes = {
  filePickerKey: PropTypes.string,
  header: PropTypes.string,
  image: PropTypes.string,
  className: PropTypes.string,
  size: PropTypes.number.isRequired,
  radius: PropTypes.number,
  backgroundColor: PropTypes.string,
  title: PropTypes.string,
  getAvatarandColor: PropTypes.func,
  isClickable: PropTypes.bool,
};

PPAvatar.defaultProps = {
  isClickable: true,
};

export default PPAvatar;
