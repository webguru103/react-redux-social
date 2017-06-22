/* eslint-disable jsx-a11y/no-static-element-interactions */
/*
* Boards
* Analytics Info for Social Channels.
* i.e. Facebook, LinkedIn, Twitter, Pinterest
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import moment from 'moment';
import enhanceWithClickOutside from 'react-click-outside';
import { browserHistory } from 'react-router';
import { Draggable } from 'react-drag-and-drop';

import DeletePostSetDialog from 'components/DeletePostSetDialog';

import MenuPopover from '../MenuPopover';
import styles from './styles.scss';

class PostSet extends Component {
  componentWillMount() {
    this.setState({ popOver: false, deleteConfirmPopup: false });
  }

  goToPostEditor = () => {
    const { postSet } = this.props;
    browserHistory.push({
      pathname: `/account/${postSet.get('account_id')}/boards`,
      hash: `#postset-${postSet.get('post_set_id')}`,
      state: { prevUrl: window.location.href },
    });
  }

  showPopover = (e) => {
    e.stopPropagation();
    this.setState({ popOver: true });
  }

  showDeleteConfirm = (show) => {
    this.setState({ deleteConfirmPopup: show });
  }

  handleClickOutside() {
    this.setState({ popOver: false });
  }

  render() {
    const { postSet, onDeletePostSet } = this.props;
    const { popOver, deleteConfirmPopup } = this.state;
    const imgSrc = postSet.getIn(['media_items', 0, 'properties', 'source_url']); // TODO: I couldn't get any image.
    const hasImage = !!imgSrc;
    const scheduledTime = postSet.getIn(['posts', 0, 'schedule_time']);
    const formattedTime = scheduledTime && moment(scheduledTime * 1000).format('MMM DD - hh:mma');
    const title = postSet.get('title');
    const description = postSet.get('message');
    return (
      <Draggable type="post_set" data={postSet.get('post_set_id')} className={styles.postSet} onClick={this.goToPostEditor}>
        <div className={hasImage ? styles.image : styles.noImage} style={{ backgroundImage: `url(${imgSrc})` }}>
          { hasImage ? null : <i className="fa fa-picture-o" /> }
        </div>
        <div className={styles.contentBlock}>
          <div className={styles.contentHeading}>
            <div className={[styles.scheduleTime, scheduledTime ? null : styles.notScheduled].join(' ')}>
              {formattedTime || 'Not Scheduled'}
            </div>
            <div className={styles.ellipsis} onClick={this.showPopover} >
              <i className="fa fa-ellipsis-h" />
              <MenuPopover
                onDeletePostSet={() => this.showDeleteConfirm(true)}
                show={popOver}
              />
            </div>
          </div>
          <div className={styles.title}>
            {title}
          </div>
          <div className={styles.description}>
            {description}
          </div>
        </div>
        <DeletePostSetDialog
          active={deleteConfirmPopup}
          handleDialogToggle={() => this.showDeleteConfirm(false)}
          deletePostSet={onDeletePostSet}
        />
      </Draggable>
    );
  }
}

PostSet.propTypes = {
  postSet: ImmutablePropTypes.contains({

  }).isRequired,
  onDeletePostSet: PropTypes.func.isRequired,
};

export default enhanceWithClickOutside(PostSet);
