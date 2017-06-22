/*
* Boards
* Analytics Info for Social Channels.
* i.e. Facebook, LinkedIn, Twitter, Pinterest
*/

import React, { PropTypes } from 'react';

import ImmutablePropTypes from 'react-immutable-proptypes';
import { Droppable } from 'react-drag-and-drop';
import PostSet from '../PostSet';
import styles from './styles.scss';

const PostSetsGroup = ({ status, postSets, statusColor, deletePostSet, onDragEnter, onDrop, dragHover }) =>
  <Droppable types={['post_set']} onDrop={onDrop} onDragEnter={onDragEnter} className={styles.postSets}>
    <div className={styles.heading}>
      <span className={styles.status}>{status}</span>
      <div className={styles.postSetsCount} style={{ backgroundColor: statusColor }}>{postSets.size}</div>
    </div>
    {
      postSets.map((postSet) =>
        <div key={postSet.get('post_set_id')} className={styles.postSet}>
          <PostSet postSet={postSet} onDeletePostSet={() => deletePostSet(postSet.get('post_set_id'))} />
        </div>
      )
    }
    <div className={`${styles.overlay} ${dragHover ? styles.active : ''}`} style={{ backgroundColor: statusColor }} />
  </Droppable>;

PostSetsGroup.propTypes = {
  status: PropTypes.string.isRequired,
  postSets: ImmutablePropTypes.listOf(
    ImmutablePropTypes.contains({

    })
  ).isRequired,
  statusColor: PropTypes.string.isRequired,
  deletePostSet: PropTypes.func.isRequired,
  onDragEnter: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired,
  dragHover: PropTypes.bool.isRequired,
};

export default PostSetsGroup;
