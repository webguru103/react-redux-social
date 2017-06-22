import React, { Component } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import Wrapper from './Wrapper';
import MediaItem from './MediaItem';
import ProcessingItem from './ProcessingItem';

import {
  makeSelectVisibleMediaItemsWithSearch,
  makeSelectProcessingItem,
  makeSelectFilter,
  makeSelectSortOrder,
} from '../selectors';

const mapStateToProps = createStructuredSelector({
  visibleMediaItems: makeSelectVisibleMediaItemsWithSearch(),
  processingItem: makeSelectProcessingItem(),
  filter: makeSelectFilter(),
  sortOrder: makeSelectSortOrder(),
});

class VisibleMediaContainer extends Component {
  render() {
    return (
      <Wrapper className='row'>
        { !this.props.visibleMediaItems && <span>You don't have any media items yet.</span> }
        { this.props.processingItem && <ProcessingItem />}
        { this.props.visibleMediaItems && this.props.visibleMediaItems.map((item, i) => <MediaItem key={i} mediaItem={item} query={this.props.query} createPostSet={this.props.createPostSet} onDelete={this.props.onConfirmDelete} openPreview={this.props.openPreview} openEditor={this.props.openEditor} />)}
      </Wrapper>
    );
  }
}

export default connect(mapStateToProps)(VisibleMediaContainer);
