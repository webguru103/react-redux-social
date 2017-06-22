import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import SmoothCollapse from 'react-smooth-collapse';
import { values } from 'lodash';

import Heading from 'components/Heading';
import AutoMultiSelect from 'components/AutoMultiSelect';

import { makeSelectAccountTags } from 'containers/PostEditor/selectors';
import Wrapper from './Wrapper';

class Tags extends Component {

  static propTypes = {
    accountTags: ImmutablePropTypes.map,
    postSet: ImmutablePropTypes.map,
    updatePostSet: PropTypes.func,
  };

  state = { isExpanded: true };

  getTags = () => {
    const { postSet } = this.props;
    const tags = postSet.get('tags');
    return tags ? values(tags.toJS()) : [];
  }

  expand = (isExpanded) => {
    this.setState({ isExpanded });
  }

  handleChange = (tags) => {
    const { postSet, updatePostSet } = this.props;

    updatePostSet({
      ...postSet.toJS(),
      id: postSet.get('post_set_id'),
      tags,
    });
  }

  render() {
    const { accountTags } = this.props;
    const { isExpanded } = this.state;
    const tags = this.getTags();

    return (
      <Wrapper expanded={isExpanded}>
        <Heading
          title="Tags"
          icon="tags"
          iconColor="#B171B5"
          expand={this.expand}
          isExpanded={isExpanded}
        />
        <SmoothCollapse expanded={isExpanded}>
          <div className="description">Add Tags</div>
          <AutoMultiSelect
            items={tags}
            suggestions={accountTags.get('data')}
            onChange={this.handleChange}
          />
        </SmoothCollapse>
      </Wrapper>
    );
  }
}

function mapDispatchToProps() {
  return {};
}

const mapStateToProps = createStructuredSelector({
  accountTags: makeSelectAccountTags(),
});

export default connect(mapStateToProps, mapDispatchToProps)(Tags);
