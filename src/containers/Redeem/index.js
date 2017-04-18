import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  redeemToken,
} from './actions';
import {
  selectRedeem,
} from './selectors';

import Wrapper from './Wrapper';

class Redeem extends Component {
  static propTypes = {
    params: PropTypes.object,
    redeem: PropTypes.object,
    redeemToken: PropTypes.func,
  }

  componentWillMount() {
    const { redeemToken, params } = this.props;
    redeemToken(params.token);
  }

  render() {
    const { redeem } = this.props;

    return (
      redeem.error ?
        <Wrapper>
          Redemption Failed. Please Try Again!
        </Wrapper>
        :
        <Wrapper>
          Redeeming!
        </Wrapper>
    );
  }
}

export const mapStateToProps = createStructuredSelector({
  redeem: selectRedeem,
});

export const mapDispatchToProps = (dispatch) => ({
  redeemToken: (token) => dispatch(redeemToken(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Redeem);
