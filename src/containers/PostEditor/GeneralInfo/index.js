import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import Wrapper from './Wrapper';
import Title from './Title';
import Subtitle from './Subtitle';

function handleTitleKeyDown(e) {
  if (e.keyCode === 13) {
    e.preventDefault();
    e.target.blur();
  }
}

function GeneralInfo({ user, postSet, postTitle, handleTitleChange, handleTitleBlur, modal, goBack }) {
  const onBack = () => {
    goBack();
  };

  // console.log('user', user);
  // console.log('postSet', postSet);
  if (!postSet.post_set_id) return null;
  const userName = postSet.user_id === user.user_id ? user.display_name : postSet.user.display_name;
  const creationTime = moment.unix(postSet.creation_time).format('M/DD/YYYY hh:mma');
  return (
    <Wrapper modal={modal}>
      <div>
        <Title
          contentEditable
          onInput={handleTitleChange}
          onBlur={handleTitleBlur}
          onKeyDown={handleTitleKeyDown}
        >
          {postTitle}
        </Title>
        <br />
        <Subtitle>{`Created by ${userName} \u00a0\u00a0 | \u00a0\u00a0 ${creationTime}`}</Subtitle>
      </div>
      {
        modal ? (
          <div className="back-button" onClick={onBack}>
            ×
          </div>
        ) : null
      }
    </Wrapper>
  );
}

GeneralInfo.propTypes = {
  handleTitleBlur: PropTypes.func,
  handleTitleChange: PropTypes.func,
  goBack: PropTypes.func,
  postSet: PropTypes.object,
  postTitle: PropTypes.string,
  user: PropTypes.shape(),
  modal: PropTypes.bool,
};

export default GeneralInfo;
