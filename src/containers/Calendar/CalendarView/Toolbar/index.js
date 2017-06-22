import React, { PropTypes } from 'react';
import moment from 'moment';

import Wrapper from './Wrapper';

function Toolbar({ onNavigate, date }) {
  const month = moment(date).format('MMMM');
  const year = moment(date).format('YYYY');
  return (
    <Wrapper>
      <div className="calendar-toolbar-text">
        <span className="calendar-toolbar-month">{month} </span>
        <span className="calendar-toolbar-year">{year}</span>
      </div>
      <i className="fa fa-angle-left calendar-toolbar-prev" aria-hidden="true" onClick={() => onNavigate('PREV')} />
      <i className="fa fa-angle-right calendar-toolbar-next" aria-hidden="true" onClick={() => onNavigate('NEXT')} />
    </Wrapper>
  );
}

Toolbar.propTypes = {
  date: PropTypes.instanceOf(Date),
  onNavigate: PropTypes.func.isRequired,
};

export default Toolbar;
