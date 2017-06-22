import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styled from 'styled-components';

import MediaItemPreview from 'components/MediaItemPreview';
import DropdownMenu from 'react-dd-menu';
import PPMenuItem from 'elements/atm.MenuItem';
import Button from 'elements/atm.Button';

const Wrapper = styled.div`
  width: 60%;
  height: 100%;
  padding: 20px 40px;
  float: left;
  overflow: auto;
`;
const Content = styled.div`
  width: 400px;
`;
const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Title = styled.div`
  margin-right: 26px;
  color: #6F6F6F;
  font-size: 18px;
`;
const UserAndTime = styled.div`
  margin-top: 9px;
  font-size: 12px;
  line-height: 15px;
  color: #8C9496;
`;
const Message = styled.div`
  margin-top: 24px;
  margin-bottom: 21px;
  color: #616669;
  font-size: 12px;
  line-height: 15px;
`;

const DropDownMenu = styled(DropdownMenu)`
  position: relative;
  .dd-menu-items {
    position: absolute;
    background: white;
    box-shadow: 0 1px 5px 0 rgba(60,92,129,0.22);
    right: 0;
    ul {
      padding: 0;
      text-align: left;
      white-space: nowrap;
      margin-bottom: 0;
    }
  }
`;

class CopyPostDropDown extends Component {
  static propTypes = {
    addPostsIdea: PropTypes.func,
    addPostsAndEdit: PropTypes.func,
  }

  state = { userMenuOpen: false };

  render() {
    const { addPostsIdea, addPostsAndEdit } = this.props;
    const { userMenuOpen } = this.state;
    const menuOptions = {
      isOpen: userMenuOpen,
      close: () => this.setState({ userMenuOpen: false }),
      toggle: (
        <Button
          primary
          onClick={() => this.setState({ userMenuOpen: !userMenuOpen })}
        >
          Copy Post
        </Button>
      ),
      align: 'left',
    };
    return (
      <DropDownMenu {...menuOptions}>
        <PPMenuItem caption="Add to Posts Ideas" onTouchTap={addPostsIdea} />
        <PPMenuItem caption="Add to Posts and Edit Now" onTouchTap={addPostsAndEdit} />
      </DropDownMenu>
    );
  }
}


const PostSetDetail = ({
  postSet,
  addPostsIdea,
  addPostsAndEdit,
}) => (
  <Wrapper>
    <Content>
      <TitleRow>
        <Title>
          { postSet.get('title') }
        </Title>
        <CopyPostDropDown
          addPostsIdea={addPostsIdea}
          addPostsAndEdit={addPostsAndEdit}
        />
      </TitleRow>
      <UserAndTime>
        created by { postSet.get('user_id') }
      </UserAndTime>
      <Message>
        { postSet.get('message') }
      </Message>
      <MediaItemPreview
        mediaItems={postSet.get('media_items')}
      />
    </Content>
  </Wrapper>
);

PostSetDetail.propTypes = {
  postSet: ImmutablePropTypes.map,
  addPostsIdea: PropTypes.func,
  addPostsAndEdit: PropTypes.func,
};

PostSetDetail.defaultProps = {
  postSet: new Map(),
};

export default PostSetDetail;
