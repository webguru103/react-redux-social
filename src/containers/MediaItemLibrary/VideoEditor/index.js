import React, { Component } from 'react';
import PropTypes from 'prop-types';
import filepicker from 'filepicker-js';

import PPDialog from 'elements/atm.Dialog';
import TextArea from 'elements/atm.TextArea';
import PPTextField from 'elements/atm.TextField';
import FontIcon from 'elements/atm.FontIcon';
import Button from 'elements/atm.Button';
import SimpleButton from 'elements/atm.SimpleButton';

import theme from 'theme';

import Wrapper from './Wrapper';
import LargeImageWrapper from './LargeImageWrapper';
import HeadingWrapper from './HeadingWrapper';
import BodyWrapper from './BodyWrapper';
import FooterWrapper from './FooterWrapper';


class VideoEditor extends Component {
  static propTypes = {
    videoItem: PropTypes.shape(),
    isOpen: PropTypes.bool,
    filePickerKey: PropTypes.string,
    handleSave: PropTypes.func,
    closeAllDialog: PropTypes.func,
  }

  constructor(props) {
    super(props);

    this.state = {
      titleValue: (props.videoItem.properties && props.videoItem.properties.title) || '',
      descriptionValue: (props.videoItem.properties && props.videoItem.properties.description) || '',
      source: false,
      selectedImage: {},
    };

    this.prepareItem = this.prepareItem.bind(this);
    this.removeCoverImage = this.removeCoverImage.bind(this);
    this.openFilePicker = this.openFilePicker.bind(this);
    this.handleFilePickerSuccess = this.handleFilePickerSuccess.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.titleValue && nextProps.videoItem.properties && nextProps.videoItem.properties.title) {
      this.setState({ titleValue: nextProps.videoItem.properties.title });
    }
    if (!this.state.descriptionValue && nextProps.videoItem.properties && nextProps.videoItem.properties.description) {
      this.setState({ descriptionValue: nextProps.videoItem.properties.description });
    }
    if (!this.state.source && nextProps.videoItem.properties) {
      this.setState({ source: nextProps.videoItem.source_url || nextProps.videoItem.properties.url });
    }
    if (nextProps.videoItem.properties && nextProps.videoItem.properties.thumb_url) {
      this.setState({ selectedImage: { url: nextProps.videoItem.properties.thumb_url } });
    }
    if (!nextProps.isOpen) {
      this.setState({
        selectedImage: '',
        titleValue: '',
        descriptionValue: '',
        source: false,
      });
    }
  }

  handleInputChange = (name, value) => {
    this.setState({ ...this.state, [name]: value });
  };

  removeCoverImage() {
    this.setState({ selectedImage: {}, selectedImageIndex: -1 });
  }

  prepareItem() {
    let Item = {};
    if (this.props.videoItem.media_item_id) {
      const { properties, ...rest } = this.props.videoItem;
      const { title, description, ...other } = properties;
      Item = {
        action: 'update',
        properties: {
          ...other,
          title: this.state.titleValue || title || '',
          description: this.state.descriptionValue || description || '',
          thumb_url: this.state.selectedImage.url || '',
          picture: this.state.selectedImage.url || '',
        },
        ...rest,
      };
    } else {
      Item = {
        action: 'create',
        mediaItemType: this.props.videoItem.mediaItemType,
        properties: {
          title: this.state.titleValue,
          description: this.state.descriptionValue,
          thumb_url: this.state.selectedImage.url || '',
          picture: this.state.selectedImage.url || '',
          ...this.props.videoItem.properties,
        },
      };
    }

    this.setState({
      titleValue: '',
      descriptionValue: '',
      selectedImage: {},
      source: false,
    });

    this.props.handleSave(Item);
  }

  openFilePicker() {
    filepicker.setKey(this.props.filePickerKey);

    const filePickerOptions = {
      buttonText: 'Choose',
      container: 'modal',
      multiple: false,
      maxFiles: 1,
      imageQuality: 80,
      imageMax: [1200, 1200],
      services: ['COMPUTER', 'WEBCAM', 'VIDEO', 'IMAGE_SEARCH', 'FLICKR', 'GOOGLE_DRIVE', 'FACEBOOK', 'INSTAGRAM', 'BOX', 'SKYDRIVE', 'URL'],
      conversions: ['crop', 'filter'],
    };
    function onFail(error) {
      console.log(`error: ${error}`);
    }
    filepicker.pick(filePickerOptions, this.handleFilePickerSuccess, onFail);
  }

  handleFilePickerSuccess(mediaItem) {
    this.setState({ selectedImage: mediaItem, selectedImageIndex: -1 });
  }

  render() {
    const { isOpen, closeAllDialog, videoItem } = this.props;
    const { titleValue, descriptionValue, selectedImage } = this.state;

    const fileName = (videoItem.properties && videoItem.properties.filename) || '';

    return (
      <PPDialog
        active={isOpen}
        onEscKeyDown={closeAllDialog}
        onOverlayClick={closeAllDialog}
      >
        <Wrapper>
          <HeadingWrapper>
            <div className="header-info">
              <h3>Content Editor<span><i className="fa fa-video-camera" />{fileName}</span></h3>
              <button onClick={closeAllDialog}><FontIcon value="clear" /></button>
            </div>
            <p>Modify the video information below.</p>
          </HeadingWrapper>
          <BodyWrapper>
            <div className="info-wrapper">
              <PPTextField
                type="text"
                name="title"
                floatingLabelText="Title"
                value={titleValue}
                onChange={(e) => this.handleInputChange('titleValue', e.target.value)}
              />
              <TextArea
                floatingLabelText="Description"
                rows={3}
                value={descriptionValue}
                onChange={(e) => this.handleInputChange('descriptionValue', e.target.value)}
              />
            </div>
            <div className="image-wrapper">
              {selectedImage && selectedImage.url &&
                <div className="header">
                  <p>Cover Image</p>
                  <SimpleButton
                    style={{ fontSize: '13px' }}
                    color={theme.textColor}
                    onClick={this.removeCoverImage}
                    noBorder
                  >
                    Remove
                  </SimpleButton>
                </div>
              }
              {selectedImage && selectedImage.url &&
                <div className="cover-image">
                  <LargeImageWrapper src={selectedImage.url} />
                </div>
              }
              <SimpleButton
                style={{ fontSize: '13px' }}
                color={theme.textColor}
                onClick={this.openFilePicker}
                noBorder
              >
                Upload New Cover Image
              </SimpleButton>
            </div>
          </BodyWrapper>
          <FooterWrapper>
            <div className="button-wrapper">
              <Button onClick={this.prepareItem} primary>Save Content</Button>
            </div>
          </FooterWrapper>
        </Wrapper>
      </PPDialog>
    );
  }
}

export default VideoEditor;
