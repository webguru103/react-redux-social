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
import SmallImageWrapper from './SmallImageWrapper';
import HeadingWrapper from './HeadingWrapper';
import BodyWrapper from './BodyWrapper';
import FooterWrapper from './FooterWrapper';

class LinkEditor extends Component {

  static propTypes = {
    urlContent: PropTypes.shape(),
    linkItem: PropTypes.shape(),
    filePickerKey: PropTypes.string,
    linkEditorDialog: PropTypes.func,
    closeAllDialog: PropTypes.func,
    handleLinkEditorSave: PropTypes.func,
  }

  constructor(props) {
    super(props);

    const { urlContent } = this.props;

    let selectedImage = {};
    let selectedImageIndex = -1;

    if (urlContent.images && urlContent.images.length) {
      selectedImage = urlContent.images[0];
      selectedImageIndex = 0;
    }

    this.state = {
      titleValue: urlContent.title || '',
      descriptionValue: urlContent.description || '',
      selectedImage,
      url: '',
      selectedImageIndex,
    };

    this.removeCoverImage = this.removeCoverImage.bind(this);
    this.openFilePicker = this.openFilePicker.bind(this);
    this.handleFilePickerSuccess = this.handleFilePickerSuccess.bind(this);
    this.prepareLinkItem = this.prepareLinkItem.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.linkEditorDialog) {
      this.setState({
        selectedImage: {},
        titleValue: '',
        descriptionValue: '',
        selectedImageIndex: -1,
      });
    }

    if (nextProps.linkItem && nextProps.linkItem.properties) {
      if (this.state.url !== nextProps.linkItem.properties.link) {
        this.setState({ url: nextProps.linkItem.properties.link });
      }
      if (this.state.titleValue !== nextProps.linkItem.properties.title) {
        this.setState({ titleValue: nextProps.linkItem.properties.title });
      }
      if (this.state.captionValue !== nextProps.linkItem.properties.description) {
        this.setState({ descriptionValue: nextProps.linkItem.properties.description });
      }
      if (this.state.selectedImage !== nextProps.linkItem.properties.picture) {
        this.setState({ selectedImage: { url: nextProps.linkItem.properties.picture } });
      }
    }

    if (nextProps.urlContent && nextProps.urlContent.title) {
      if (this.state.titleValue !== nextProps.urlContent.title) {
        this.setState({ titleValue: nextProps.urlContent.title });
      }
      if (this.state.captionValue !== nextProps.urlContent.description) {
        this.setState({ descriptionValue: nextProps.urlContent.description });
      }
      if (this.state.url !== nextProps.urlContent.original_url) {
        this.setState({ url: nextProps.urlContent.original_url });
      }
      if (nextProps.urlContent.images && nextProps.urlContent.images.length) {
        this.setState({ selectedImage: nextProps.urlContent.images[0], selectedImageIndex: 0 });
      }
    }
  }
  handleInputChange = (name, value) => {
    this.setState({ ...this.state, [name]: value });
  };

  removeCoverImage() {
    this.setState({ selectedImage: {}, selectedImageIndex: -1 });
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

  prepareLinkItem() {
    let imageUrl = '';
    if (this.state.selectedImage.url) {
      imageUrl = this.state.selectedImage.url;
    }

    let linkItem = {};
    if (Object.keys(this.props.linkItem).length > 0) {
      const { properties, ...rest } = this.props.linkItem;

      linkItem = {
        action: 'update',
        properties: {
          ...properties,
          title: this.state.titleValue,
          description: this.state.descriptionValue,
          picture: imageUrl,
        },
        ...rest,
      };
    } else {
      linkItem = {
        action: 'create',
        url: this.props.urlContent.url,
        title: this.state.titleValue,
        description: this.state.descriptionValue,
        picture: imageUrl,
      };
    }
    this.setState({
      selectedImage: {},
      titleValue: '',
      descriptionValue: '',
      selectedImageIndex: -1,
      url: '',
    });

    this.props.handleLinkEditorSave(linkItem);
  }

  render() {
    const { urlContent, linkEditorDialog, closeAllDialog } = this.props;
    const { url, titleValue, descriptionValue, selectedImage, selectedImageIndex } = this.state;

    return (
      <PPDialog
        active={linkEditorDialog}
        onEscKeyDown={closeAllDialog}
        onOverlayClick={closeAllDialog}
      >
        <Wrapper>
          <HeadingWrapper>
            <div className="header-info">
              <h3>Content Editor<span><i className="fa fa-link" />{url}</span></h3>
              <button onClick={closeAllDialog}><FontIcon value="clear" /></button>
            </div>
            <p>Modify the link information below.</p>
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
            {(urlContent.images && urlContent.images.length > 0) &&
              <div className="gallery">
                <p>Select Cover Image</p>
                <div>
                  { urlContent.images.map((image, i) =>
                    <div key={i} style={{ marginRight: '10px' }}>
                      <SmallImageWrapper src={image.url} isSelected={selectedImageIndex === i} onClick={() => { this.setState({ selectedImage: image, selectedImageIndex: i }); }} />
                    </div>
                      )}
                </div>
              </div>
            }
            <div className="button-wrapper">
              <Button onClick={this.prepareLinkItem} primary>Save Content</Button>
            </div>
          </FooterWrapper>
        </Wrapper>
      </PPDialog>
    );
  }
}

export default LinkEditor;
