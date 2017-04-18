/* eslint-disable camelcase */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import LeftPane from 'components/LeftPane';
import RightPane from 'components/RightPane';
import imgLogo from 'assets/images/logo.png';

import Wrapper from './Wrapper';
import FormWrapper from './FormWrapper';
import Topbar from './Topbar';

import {
  fetchPlan,
} from './actions';
import {
  selectPlan,
} from './selectors';

class Signup extends Component {
  static propTypes = {
    children: PropTypes.node,
    location: PropTypes.object,
    plan: PropTypes.object,
    fetchPlan: PropTypes.func,
  }

  componentWillMount() {
    const { fetchPlan, location } = this.props;

    fetchPlan(location.query.plan_id);
  }

  render() {
    const { children, plan } = this.props;

    const {
      title,
      price,
      term_length,
      features = [],
    } = plan.detail || {};

    return (
      <Wrapper>
        <LeftPane>
          <img src={imgLogo} alt="Logo" />
          <div style={{ marginTop: '120px' }}>PowerPost Business Plan</div>
          <div style={{ marginTop: '20px', fontSize: '2.5rem' }}>{title}</div>
          <div style={{ marginTop: '15px' }}>
            <span style={{ fontSize: '1.5rem' }}>${price}</span>&nbsp;
            <span>{term_length}</span>
          </div>
          <div style={{ marginTop: '15px' }}>
            { features.join('. ') }
          </div>
          <div style={{ position: 'absolute', left: 0, bottom: 0 }}>Not the plan you want, we've got you covered. View Plans</div>
        </LeftPane>
        <RightPane>
          <Topbar />
          <FormWrapper>
            { React.cloneElement(children, {

            })
            }
          </FormWrapper>
        </RightPane>
      </Wrapper>
    );
  }
}

export const mapStateToProps = createStructuredSelector({
  plan: selectPlan(),
});

export const mapDispatchToProps = (dispatch) => ({
  fetchPlan: (planId) => dispatch(fetchPlan(planId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
