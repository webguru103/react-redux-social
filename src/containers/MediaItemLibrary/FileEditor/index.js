import React, { Component } from 'react';
import PropTypes from 'prop-types';
import filepicker from 'filepicker-js';
import { isEmpty } from 'lodash';

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


class FileEditor extends Component {
  static propTypes = {
    fileItem: PropTypes.shape(),
    isOpen: PropTypes.bool,
    filePickerKey: PropTypes.string,
    handleSave: PropTypes.func,
    closeAllDialog: PropTypes.func,
  }

  constructor(props) {
    super(props);

    this.state = {
      titleValue: (props.fileItem.properties && props.fileItem.properties.title) || '',
      descriptionValue: (props.fileItem.properties && props.fileItem.properties.description) || '',
      source: false,
      selectedImage: {},
    };

    this.prepareItem = this.prepareItem.bind(this);
    this.removeCoverImage = this.removeCoverImage.bind(this);
    this.openFilePicker = this.openFilePicker.bind(this);
    this.handleFilePickerSuccess = this.handleFilePickerSuccess.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.titleValue && nextProps.fileItem.properties && nextProps.fileItem.properties.title) {
      this.setState({ titleValue: nextProps.fileItem.properties.title });
    }
    if (!this.state.descriptionValue && nextProps.fileItem.properties && nextProps.fileItem.properties.description) {
      this.setState({ descriptionValue: nextProps.fileItem.properties.description });
    }
    if (!this.state.source && nextProps.fileItem.properties) {
      this.setState({ source: nextProps.fileItem.source_url || nextProps.fileItem.properties.url });
    }
    if (nextProps.fileItem.properties && nextProps.fileItem.properties.picture) {
      this.setState({ selectedImage: { url: nextProps.fileItem.properties.picture } });
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
    if (this.props.fileItem.media_item_id) {
      const { properties, ...rest } = this.props.fileItem;
      const { title, description, ...other } = properties;
      Item = {
        action: 'update',
        properties: {
          ...other,
          title: this.state.titleValue || title || '',
          description: this.state.descriptionValue || description || '',
          picture: this.state.selectedImage.url || '',
        },
        ...rest,
      };
    } else {
      Item = {
        action: 'create',
        mediaItemType: this.props.fileItem.mediaItemType,
        properties: {
          title: this.state.titleValue,
          description: this.state.descriptionValue,
          picture: this.state.selectedImage.url || '',
          ...this.props.fileItem.properties,
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
    const { isOpen, closeAllDialog, fileItem } = this.props;
    const { titleValue, descriptionValue, selectedImage } = this.state;

    const fileName = (fileItem.properties && fileItem.properties.filename) || '';

    return (
      <PPDialog
        active={isOpen}
        onEscKeyDown={closeAllDialog}
        onOverlayClick={closeAllDialog}
      >
        {!isEmpty(fileItem) &&
          <Wrapper>
            <HeadingWrapper>
              <div className="header-info">
                <h3>Content Editor<span><i className="fa fa-file-text-o" />{fileName}</span></h3>
                <button onClick={closeAllDialog}><FontIcon value="clear" /></button>
              </div>
              <p>Modify the file information below.</p>
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
        }
      </PPDialog>
    );
  }
}

export default FileEditor;
