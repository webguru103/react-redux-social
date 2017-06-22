import React, { Component } from 'react';
import PropTypes from 'prop-types';

import PPDialog from 'elements/atm.Dialog';
import TextArea from 'elements/atm.TextArea';
import PPTextField from 'elements/atm.TextField';
import FontIcon from 'elements/atm.FontIcon';
import Button from 'elements/atm.Button';

import Wrapper from './Wrapper';
import HeadingWrapper from './HeadingWrapper';
import BodyWrapper from './BodyWrapper';
import FooterWrapper from './FooterWrapper';
import LargeImageWrapper from './LargeImageWrapper';

class ImageEditor extends Component {
  static propTypes = {
    imageItem: PropTypes.shape(),
    isOpen: PropTypes.bool,
    closeAllDialog: PropTypes,
    handleSave: PropTypes.func,
  }

  constructor(props) {
    super(props);

    this.state = {
      titleValue: (props.imageItem.properties && props.imageItem.properties.title) || '',
      descriptionValue: (props.imageItem.properties && props.imageItem.properties.description) || '',
      selectedImage: props.imageItem.url || '',
      fileName: (props.imageItem.properties && props.imageItem.properties.filename) || '',
    };

    this.prepareItem = this.prepareItem.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.fileName && nextProps.imageItem.properties && nextProps.imageItem.properties.filename) {
      this.setState({ fileName: nextProps.imageItem.properties.filename });
    }
    if (!this.state.titleValue && nextProps.imageItem.properties && nextProps.imageItem.properties.title) {
      this.setState({ titleValue: nextProps.imageItem.properties.title });
    }
    if (!this.state.descriptionValue && nextProps.imageItem.properties && nextProps.imageItem.properties.description) {
      this.setState({ descriptionValue: nextProps.imageItem.properties.description });
    }
    if (nextProps.imageItem.properties && nextProps.imageItem.properties.url && !this.state.selectedImage) {
      this.setState({ selectedImage: nextProps.imageItem.properties.url });
    }
    if (!nextProps.isOpen) {
      this.setState({
        selectedImage: '',
        titleValue: '',
        descriptionValue: '',
        fileName: '',
      });
    }
  }

  handleInputChange = (name, value) => {
    this.setState({ ...this.state, [name]: value });
  };

  prepareItem() {
    let Item = {};
    if (this.props.imageItem.media_item_id) {
      const { properties, ...rest } = this.props.imageItem;
      const { title, description, ...other } = properties;
      Item = {
        action: 'update',
        properties: {
          ...other,
          title: this.state.titleValue || title || '',
          description: this.state.descriptionValue || description || '',
        },
        ...rest,
      };
    } else {
      Item = {
        action: 'create',
        mediaItemType: this.props.imageItem.mediaItemType,
        properties: {
          title: this.state.titleValue,
          description: this.state.descriptionValue,
          ...this.props.imageItem.properties,
        },
      };
    }

    this.setState({
      titleValue: '',
      descriptionValue: '',
      selectedImage: '',
    });

    this.props.handleSave(Item);
  }

  render() {
    const { isOpen, closeAllDialog } = this.props;
    const { titleValue, descriptionValue, selectedImage, fileName } = this.state;

    return (
      <PPDialog
        active={isOpen}
        onEscKeyDown={closeAllDialog}
        onOverlayClick={closeAllDialog}
      >
        <Wrapper>
          <HeadingWrapper>
            <div className="header-info">
              <h3>Content Editor<span><i className="fa fa-picture-o" />{fileName}</span></h3>
              <button onClick={closeAllDialog}><FontIcon value="clear" /></button>
            </div>
            <p>Modify the image information below.</p>
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
                rows={2}
                value={descriptionValue}
                onChange={(e) => this.handleInputChange('descriptionValue', e.target.value)}
              />
            </div>
            <div className="image-wrapper">
              <div className="cover-image">
                {selectedImage && <LargeImageWrapper src={selectedImage} />}
              </div>
            </div>
          </BodyWrapper>
          <FooterWrapper>
            <div className="button-wrapper">
              <Button label="Save Content" onClick={this.prepareItem} primary />
            </div>
          </FooterWrapper>
        </Wrapper>
      </PPDialog>
    );
  }
}

export default ImageEditor;
