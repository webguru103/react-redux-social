import React from 'react';
import Wrapper from './Wrapper';
import PPDialog from 'elements/atm.Dialog';
import Input from 'react-toolbox/lib/input';
import Button from 'elements/atm.Button';
import MediaItem from 'containers/MediaItemLibrary/MediaContainer/MediaItem';
import FilterLink from './FilterLink';

import {
  SHOW_ALL,
  SHOW_BLOGS,
  SHOW_VIDEOS,
  SHOW_LINKS,
  SHOW_IMAGES,
  SHOW_FILES,
} from 'containers/PostEditor/constants';

class MediaLibraryDialog extends React.Component {
  constructor(props) {
    super(props);
  
  }
  
  componentWillReceiveProps(nextProps) {
  
  }
  
  render() {
    return(
      <PPDialog
        active={this.props.isOpen}
        title='Media Library'
        onEscKeyDown={this.props.closeAllDialog}
        onOverlayClick={this.props.closeAllDialog}
        actions={this.props.actions}
        type="large"
      >
        <Wrapper>
        <div className="row">
          <div className="col-md-8">
            <FilterLink filter={SHOW_ALL} active={this.props.filter === SHOW_ALL}>All</FilterLink>
            <FilterLink filter={SHOW_BLOGS} active={this.props.filter === SHOW_BLOGS}>Blogs</FilterLink>
            <FilterLink filter={SHOW_IMAGES} active={this.props.filter === SHOW_IMAGES}>Images</FilterLink>
            <FilterLink filter={SHOW_LINKS} active={this.props.filter === SHOW_LINKS}>Links</FilterLink>
            <FilterLink filter={SHOW_VIDEOS} active={this.props.filter === SHOW_VIDEOS}>Videos</FilterLink>
            <FilterLink filter={SHOW_FILES} active={this.props.filter === SHOW_FILES}>Files</FilterLink>
          </div>
        </div>
        { this.props.mediaItems  && this.props.mediaItems.map((item, i) => <MediaItem mediaItem={item} inPostEditor={true} addToPost={this.props.addToPost} />)}
        </Wrapper>
      </PPDialog>    
    );
  }
}

export default MediaLibraryDialog;