import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { noop } from 'lodash';

import Avatar from 'elements/atm.Avatar';

import Wrapper from './Wrapper';

function UserItem({ avatarUrl, name, selected, onClick }) {
  return (
    <Wrapper className={classnames({ selected })} onClick={onClick}>
      <Avatar image={avatarUrl} title={name} backgroundColor="green" size={24} isClickable={false} />
      <span>{name}</span>
      <i className={classnames('fa fa-check', { hidden: !selected })} />
    </Wrapper>
  );
}

UserItem.propTypes = {
  avatarUrl: PropTypes.string,
  name: PropTypes.string,
  selected: PropTypes.bool,
  onClick: PropTypes.func,
};

UserItem.defaultProps = {
  selected: false,
  onClick: noop,
};

export default UserItem;
