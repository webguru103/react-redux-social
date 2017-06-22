import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import TabLink from 'elements/atm.TabLink';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-right: 24px;
  border-bottom: 1px solid #E7ECEE;
`;

const ShareButton = styled.div`
  color: #888888;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;

  i {
    margin-right: 12px;
  }
`;

const TabBar = ({ owned, tabs, toggleShareDialog }) => (
  <Wrapper>
    <div>
      {
        tabs.map((t, index) => (
          <TabLink key={index} to={t.link}>
            { t.label }
          </TabLink>
        ))
      }
    </div>
    { owned &&
      <ShareButton onClick={toggleShareDialog}>
        <i className="fa fa-share-alt" />
        Share Owned Stream
      </ShareButton>
    }
  </Wrapper>
);

TabBar.propTypes = {
  owned: PropTypes.bool,
  tabs: PropTypes.arrayOf(
    PropTypes.objectOf({
      label: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
    })
  ).isRequired,
  toggleShareDialog: PropTypes.func.isRequired,
};

export default TabBar;
