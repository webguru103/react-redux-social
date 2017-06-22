import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import SmoothCollapse from 'react-smooth-collapse';
import moment from 'moment';
import filepicker from 'filepicker-js';

import Heading from 'components/Heading';
import MultiLineInput from 'components/MultiLineInput';
import AutoMultiSelect from 'components/AutoMultiSelect';

import Dropdown from 'elements/atm.Dropdown';
import PPTextField from 'elements/atm.TextField';
import DatePicker from 'elements/atm.DatePicker';
import TimePicker from 'elements/atm.TimePicker';
import Checkbox from 'elements/atm.Checkbox';
import ImageEditor from 'containers/MediaItemLibrary/ImageEditor';

import Wrapper from './Wrapper';
import LabelWrapper from './LabelWrapper';
import ScheduleRowWrapper from './ScheduleRowWrapper';
import FeaturedImage, { UploadButtonWrapper } from './FeaturedImage';

const defaultDestinationOption = {
  value: '0',
  label: 'Do Not Send To Wordpress',
};

export class WordpressSettings extends Component {
  static propTypes = {
    filePickerKey: PropTypes.string,
    accountId: PropTypes.string,
    postSet: ImmutablePropTypes.map,
    connections: PropTypes.array,
    wordpressGUI: ImmutablePropTypes.map,
    post: ImmutablePropTypes.map,
    newMediaItem: ImmutablePropTypes.map,
    updatePost: PropTypes.func,
    createPost: PropTypes.func,
    fetchWordpressGUI: PropTypes.func,
    createMediaItem: PropTypes.func,
    clearMediaItem: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      title: props.postSet.getIn(['details', 'title']),
      destination: defaultDestinationOption,
      slug: '',
      description: '',
      scheduleTime: new Date().getTime() / 1000,
      allowComments: false,
      categories: [],
      categorySuggestions: [],
      tags: [],
      tagSuggestions: [],
      author: {},
      authorOptions: [],
      featuredImageUrl: '',
      featuredImageId: '',
      isExpanded: true,
      imageEditor: false,
      mediaItem: {},
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.wordpressGUI.get('isFetching') && !nextProps.wordpressGUI.get('isFetching')) {
      if (!nextProps.wordpressGUI.get('error')) {
        const { wordpressGUI } = nextProps;

        this.setState({
          categorySuggestions: wordpressGUI
            .getIn(['data', 'categories'])
            .map((c) => c.get('slug'))
            .toJS(),
          tagSuggestions: wordpressGUI
            .getIn(['data', 'terms'])
            .map((t) => t.get('slug'))
            .toJS(),
          authorOptions: wordpressGUI
            .getIn(['data', 'authors'])
            .map((a) => ({
              value: a.get('user_id'),
              label: a.get('display_name'),
            }))
            .toJS(),
        });
      }
    }

    if (this.props.newMediaItem !== nextProps.newMediaItem) {
      const { newMediaItem } = nextProps;
      const featuredImageId = newMediaItem.get('media_item_id');
      this.setState({
        featuredImageUrl: newMediaItem.getIn(['properties', 'url']),
        featuredImageId,
      });
      this.handlePostSave({
        featured_image_id: featuredImageId,
      });
    }
  }

  expand = (isExpanded) => {
    this.setState({ isExpanded });
  }

  handleAuthorChange = (option) => {
    this.setState({
      author: option,
    });
    this.handlePostSave({
      author_id: option.value,
    });
  }

  handleBlogChange = (option) => {
    const {
      fetchWordpressGUI,
      createPost,
      updatePost,
      postSet,
      post,
    } = this.props;

    this.setState({
      destination: option,
      categories: [],
      tags: [],
    });

    if (post.get('data').isEmpty()) {
      createPost({
        post_set_id: postSet.getIn(['details', 'post_set_id']),
        connection_id: option.value,
        status: 2,
        schedule_time: new Date().getTime() / 1000,
        message: postSet.getIn(['details', 'message']),
      });
    } else {
      const data = post.get('data').toJS();
      if (option.value === '0') { // Do not post to wordpress
        updatePost({
          ...data,
          status: 0,    // Set to inactive
        });
      } else {
        updatePost({
          ...data,
          connection_id: option.value,
        });
      }
    }

    if (option.value !== '0') {
      fetchWordpressGUI({
        connectionId: option.value,
      });
    }
  }

  handleCategoriesChange = (categories) => {
    this.setState({
      categories,
    });

    this.handlePostSave({ categories });
  }

  handleCommentsChange = (allowComments) => {
    this.setState({
      allowComments,
    });
    this.handlePostSave({ allow_comments: allowComments });
  }

  handleDateChange = (date) => {
    const { post, updatePost } = this.props;

    const newDate = new Date(date).getTime() / 1000;
    this.setState({
      scheduleTime: newDate,
    });

    const newPost = {
      ...post.get('data').toJS(),
      schedule_time: newDate,
    };
    updatePost(newPost);
  }

  handleDescriptionChange = (value) => {
    this.setState({
      description: value,
    });
  }

  handleSlugChange = (ev) => {
    const { value } = ev.target;

    this.setState({
      slug: value,
    });
  }

  handlePostSave = (newParam) => {
    const { post, updatePost } = this.props;
    const {
      author,
      title,
      slug,
      description,
      allowComments,
      tags,
      categories,
      featuredImageId,
    } = this.state;

    const purePost = post.get('data').toJS();
    const newPost = {
      ...purePost,
      properties: {
        ...purePost.properties,
        author_id: author.value,
        title,
        slug,
        description,
        allow_comments: allowComments,
        tags,
        categories,
        featured_image_id: featuredImageId,
        ...newParam,
      },
    };

    updatePost(newPost);
  }

  handleTagsChange = (tags) => {
    this.setState({
      tags,
    });

    this.handlePostSave({ tags });
  }

  handleTitleChange = (ev) => {
    const { value } = ev.target;

    this.setState({
      title: value,
    });
  }

  handleImageUploadSuccess = (mediaItem) => {
    const { filePickerKey, accountId } = this.props;
    filepicker.setKey(filePickerKey);

    if (mediaItem[0].mimetype.match('image')) {
      filepicker.storeUrl(
        `https://process.filestackapi.com/${filePickerKey}/resize=width:300,height:300,fit:clip/${mediaItem[0].url}`,
        (blob) => {
          const imageItem = {
            mediaItemType: 'file',
            properties: {
              ...mediaItem[0],
              thumb_key: blob.key,
              account_id: accountId,
            },
          };
          // console.log(mediaItem);
          this.openImageEditor(imageItem);
        });
    }
  }

  handleUploadImage = () => {
    const { filePickerKey } = this.props;
    filepicker.setKey(filePickerKey);

    const filePickerOptions = {
      buttonText: 'Upload',
      container: 'modal',
      multiple: false,
      maxFiles: 1,
      imageQuality: 80,
      imageMax: [1200, 1200],
      services: ['CONVERT', 'COMPUTER', 'WEBCAM', 'VIDEO', 'IMAGE_SEARCH', 'FLICKR', 'GOOGLE_DRIVE', 'FACEBOOK', 'INSTAGRAM', 'BOX', 'SKYDRIVE', 'URL'],
      conversions: ['crop', 'filter'],
    };
    const filePickerStoreOptions = {
      location: 'S3',
    };

    function onFail(error) {
      console.log('error: ', error);
    }

    filepicker.pickAndStore(
      filePickerOptions,
      filePickerStoreOptions,
      this.handleImageUploadSuccess,
      onFail,
    );
  }

  handleRemoveImage = () => {
    this.props.clearMediaItem();
  }

  openImageEditor = (imageItem) => {
    this.setState({ imageEditor: true, mediaItem: imageItem });
  }

  closeAllDialog = () => {
    this.setState({
      imageEditor: false,
    });
  }

  handleImageEditorSave = (imageItem) => {
    this.setState({ imageEditor: false, mediaItem: {} });
    const { action, ...rest } = imageItem;

    if (action === 'create') {
      this.props.createMediaItem(rest);
    }
  }

  render() {
    const {
      post,
      connections = [],
      wordpressGUI,
      filePickerKey,
    } = this.props;

    const {
      isExpanded,
      destination,
      title,
      slug,
      description,
      scheduleTime,
      allowComments,
      categories,
      categorySuggestions,
      tags,
      tagSuggestions,
      author,
      authorOptions,
      featuredImageUrl,
    } = this.state;

    const wordpressOptions = connections
    .filter((c) => c.channel === 'wordpress')
    .map((c) => ({
      value: c.connection_id,
      label: c.display_name,
    }));

    const destinationOptions = [defaultDestinationOption]
      .concat(wordpressOptions);

    const minDate = new Date();
    minDate.setDate(minDate.getDate() - 1);

    const disabled = destination.value === '0' || wordpressGUI.get('error');

    const actions = [
      { label: 'close', onClick: this.closeAllDialog },
    ];

    return (
      <Wrapper>
        <Heading
          title="Wordpress Settings"
          icon="file-text-o"
          iconColor="#E81C64"
          expand={this.expand}
          isExpanded={isExpanded}
        />
        <SmoothCollapse expanded={isExpanded}>
          <div style={{ paddingBottom: '200px' }}>
            <LabelWrapper>Destination</LabelWrapper>
            <Dropdown
              value={destination}
              options={destinationOptions}
              placeholder="-"
              onChange={this.handleBlogChange}
            />
            <div style={{ display: disabled ? 'none' : 'block' }}>
              <LabelWrapper>Title</LabelWrapper>
              <PPTextField
                disabled={disabled}
                type="text"
                name="title"
                hintText="Title"
                value={title}
                onBlur={() => this.handlePostSave()}
                onChange={this.handleTitleChange}
              />
              <LabelWrapper style={{ marginTop: '6px' }}>URL Name</LabelWrapper>
              <PPTextField
                disabled={disabled}
                type="text"
                name="slug"
                hintText="Url Name"
                value={slug}
                onBlur={() => this.handlePostSave()}
                onChange={this.handleSlugChange}
              />
              <LabelWrapper style={{ marginTop: '6px' }}>Description</LabelWrapper>
              <MultiLineInput
                hasBorder
                disabled={disabled}
                message={description}
                handleMessageChange={this.handleDescriptionChange}
                onBlur={() => this.handlePostSave()}
              />
              <LabelWrapper>Schedule</LabelWrapper>
              <ScheduleRowWrapper>
                <div>
                  <DatePicker
                    readonly={disabled}
                    minDate={minDate}
                    value={moment.unix(scheduleTime).toDate()}
                    onChange={this.handleDateChange}
                  />
                </div>
                <div>
                  <TimePicker
                    readonly={disabled}
                    format="ampm"
                    value={moment.unix(scheduleTime).toDate()}
                    onChange={this.handleDateChange}
                  />
                </div>
              </ScheduleRowWrapper>
              <LabelWrapper>Featured Image</LabelWrapper>
              <FeaturedImage url={featuredImageUrl} />
              <UploadButtonWrapper>
                <a className={disabled && 'disabled'} onClick={this.handleUploadImage}>Upload New Image</a>
                <a className={disabled && 'disabled'} onClick={this.handleRemoveImage}>Remove</a>
              </UploadButtonWrapper>
              <LabelWrapper rightLabel="Create new categories">Categories</LabelWrapper>
              <AutoMultiSelect
                disabled={disabled}
                items={categories}
                suggestions={categorySuggestions}
                onChange={this.handleCategoriesChange}
              />
              <LabelWrapper rightLabel="Create new tags">Tags</LabelWrapper>
              <AutoMultiSelect
                disabled={disabled}
                items={tags}
                suggestions={tagSuggestions}
                onChange={this.handleTagsChange}
              />
              <LabelWrapper>Author</LabelWrapper>
              <Dropdown
                disabled={disabled}
                value={author}
                options={authorOptions}
                placeholder="Choose Author"
                onChange={this.handleAuthorChange}
              />
              <LabelWrapper />
              <Checkbox
                checked={allowComments}
                disabled={disabled}
                label="Allow Comments"
                name="allow"
                onChange={this.handleCommentsChange}
              />
            </div>
          </div>
          <ImageEditor
            actions={actions}
            closeAllDialog={this.closeAllDialog}
            handleSave={this.handleImageEditorSave}
            isOpen={this.state.imageEditor}
            filePickerKey={filePickerKey}
            imageItem={this.state.mediaItem}
          />
        </SmoothCollapse>
        <div style={{ marginTop: '-200px' }} />
      </Wrapper>
    );
  }
}

export default WordpressSettings;
