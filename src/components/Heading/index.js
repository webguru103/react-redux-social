import React from 'react';
import PropTypes from 'prop-types';
import Wrapper from './Wrapper';

function Heading({ title, border, expand, isExpanded, icon, iconColor }) {
  return (
    <Wrapper border={border} expand={expand} onClick={expand ? () => expand(!isExpanded) : () => {}}>
      {
        icon &&
        <i className={`fa fa-${icon} icon`} aria-hidden="true" style={{ color: iconColor }} />
      }
      <div className="title">{title}</div>
      {
        expand &&
        <div className="expand-icon">
          <i className={`fa fa-chevron-${isExpanded ? 'up' : 'down'}`} aria-hidden="true" />
        </div>
      }
    </Wrapper>
  );
}

Heading.propTypes = {
  title: PropTypes.string.isRequired,
  expand: PropTypes.func,
  isExpanded: PropTypes.bool,
  border: PropTypes.bool,
  icon: PropTypes.string,
  iconColor: PropTypes.string,
};

export default Heading;
