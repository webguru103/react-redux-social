import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import moment from 'moment';
import cookie from 'react-cookie';
import { browserHistory } from 'react-router';

import { toastr } from 'lib/react-redux-toastr';
import { UserCanTeam } from 'config.routes/UserRoutePermissions';

import {
  createPaymentSource,
  fetchPaymentSources,
  fetchPaymentHistory,
} from 'containers/App/actions';
import {
  selectCreatingPaymentSource,
  selectPaymentSources,
  selectPaymentHistory,
} from 'containers/App/selectors';
import { makeSelectCurrentAccount } from 'containers/Main/selectors';

import PaymentForm from 'components/PaymentForm';
import Button from 'elements/atm.Button';
import Dialog from 'react-toolbox/lib/dialog';

import Wrapper from './Wrapper';
import CardWrapper from './CardWrapper';
import PaymentCard from './PaymentCard';

import {
  fetchSubscriptions,
  cancelSubscription,
} from '../actions';
import {
  selectSubscriptions,
  selectCancellingSubscription,
} from '../selectors';

export class Plans extends Component {
  static propTypes = {
    userAccount: PropTypes.object,
    subscriptions: PropTypes.object,
    creatingPaymentSource: PropTypes.object,
    paymentSources: PropTypes.object,
    paymentHistory: PropTypes.object,
    cancellingSubscription: PropTypes.object,
    fetchSubscriptions: PropTypes.func,
    createPaymentSource: PropTypes.func,
    fetchPaymentSources: PropTypes.func,
    fetchPaymentHistory: PropTypes.func,
    cancelSubscription: PropTypes.func,
  }

  constructor(props) {
    super(props);

    this.cancelPlanActions = [
      { label: 'Yes, cancel my plan', onClick: this.cancelPlan },
      { label: 'No', onClick: this.toggleCancelPlan },
    ];
  }

  state = {
    editingPayment: false,
    cancelModalVisible: false,
  }

  componentDidMount() {
    const { userAccount } = this.props;

    const payload = { accountId: userAccount.account_id };

    this.props.fetchSubscriptions(payload);
    this.props.fetchPaymentSources(payload);
    this.props.fetchPaymentHistory(payload);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.creatingPaymentSource !== nextProps.creatingPaymentSource) {
      const { details, error } = nextProps.creatingPaymentSource;
      if (details) {
        toastr.success('Success', 'Payment info has been successfully updated!');
        this.setState({
          editingPayment: false,
        });
      } else if (error) {
        toastr.error(error);
        this.setState({
          editingPayment: false,
        });
      }
    } else if (this.props.cancellingSubscription !== nextProps.cancellingSubscription) {
      const { details, error } = nextProps.cancellingSubscription;

      if (details) {
        browserHistory.push('/');
        toastr.success('Success', 'The account plan has been cancelled');
      } else if (error) {
        toastr.error(error);
      }
    }
  }

  getCurrentPlanDOM = () => {
    const { subscriptions: { details, error } } = this.props;

    return (
      <CardWrapper>
        <div className="title-label">
          Current Plan
        </div>
        <div className="title">
          Business
        </div>
        <div className="divider" />
        { error ||
          (details &&
            <div>
              <section>
                <div className="header">Status</div>
                <div className="value">{details.cancel_at_period_end ? 'Will cancel at current period end' : details.status}</div>
              </section>
              <section>
                <div className="header">Plan Started</div>
                <div className="value">{moment(details.created * 1000).format('dddd, MMMM D, YYYY')}</div>
              </section>
              <section>
                <div className="header">Current Period Began</div>
                <div className="value">{moment(details.current_period_start * 1000).format('dddd, MMMM D, YYYY')}</div>
              </section>
              <section>
                <div className="header">Current Period End</div>
                <div className="value">{moment(details.current_period_end * 1000).format('dddd, MMMM D, YYYY')}</div>
              </section>
              <section>
                <div className="header">Billed</div>
                <div className="value">${details.plan.amount / 100}/{details.plan.interval}</div>
              </section>
              <Button onClick={this.toggleCancelPlan}>Cancel Plan</Button>
            </div>
          )
        }
      </CardWrapper>
    );
  }

  cancelPlan = () => {
    const { userAccount, subscriptions: { details, error } } = this.props;

    this.props.cancelSubscription({ accountId: userAccount.account_id, planId: details.plan.id });
    this.toggleCancelPlan();
  }

  toggleCancelPlan = () => {
    const { cancelModalVisible } = this.state;
    this.setState({
      cancelModalVisible: !cancelModalVisible,
    });
  }

  togglePayment = () => {
    const { editingPayment } = this.state;
    this.setState({
      editingPayment: !editingPayment,
    });
  }

  handlePayment = (stripeToken) => {
    this.props.createPaymentSource({
      account_id: cookie.load('account_id'),
      stripe_token: stripeToken,
    });
  }

  render() {
    const { paymentSources, paymentHistory } = this.props;
    const { editingPayment, cancelModalVisible } = this.state;

    return (
      <Wrapper>
        <div className="left-pane">
          { this.getCurrentPlanDOM() }
          { paymentSources.details &&
            paymentSources.details.map((p) =>
              <PaymentCard
                key={p.id}
                info={p}
                togglePayment={this.togglePayment}
              />
            )
          }

        </div>
        <div className="right-pane">
          <p className="title">Charge History</p>
          <table>
            <tbody>
              <tr>
                <th className="date">DATE</th>
                <th className="paid">AMOUNT PAID OR REFUNDED</th>
                <th className="status">STATUS</th>
              </tr>
              { paymentHistory.details &&
                paymentHistory.details.map((p) => {
                  const paid = !p.amount_refunded;
                  const amount = p.amount_refunded || p.amount;
                  return (
                    <tr key={p.id}>
                      <td>{moment(p.created).format('MMMM DD')}</td>
                      <td>{(amount / 100).toFixed(2)} {p.currency.toUpperCase()} {paid ? 'paid' : 'refunded'}</td>
                      <td>{p.status}</td>
                    </tr>
                  );
                })
              }
            </tbody>
          </table>
        </div>
        <Dialog
          active={editingPayment}
          onEscKeyDown={this.togglePayment}
          onOverlayClick={this.togglePayment}
          title="Please enter payment details below"
        >
          <PaymentForm couponAllowed={false} handlePayment={this.handlePayment} style={{ marginTop: '40px' }}>
            <Button type="submit" label="SAVE CARD" primary />
          </PaymentForm>
        </Dialog>
        <Dialog
          active={cancelModalVisible}
          actions={this.cancelPlanActions}
          onEscKeyDown={this.toggleCancelPlan}
          onOverlayClick={this.toggleCancelPlan}
          type="small"
          title="Are you sure?"
        >
        </Dialog>
      </Wrapper>
    );
  }
}

export const mapStateToProps = createStructuredSelector({
  userAccount: makeSelectCurrentAccount(),
  subscriptions: selectSubscriptions(),
  creatingPaymentSource: selectCreatingPaymentSource(),
  paymentSources: selectPaymentSources(),
  paymentHistory: selectPaymentHistory(),
  cancellingSubscription: selectCancellingSubscription(),
});

export const mapDispatchToProps = (dispatch) => ({
  fetchSubscriptions: (payload) => dispatch(fetchSubscriptions(payload)),
  createPaymentSource: (payload) => dispatch(createPaymentSource(payload)),
  fetchPaymentSources: (payload) => dispatch(fetchPaymentSources(payload)),
  fetchPaymentHistory: (payload) => dispatch(fetchPaymentHistory(payload)),
  cancelSubscription: (payload) => dispatch(cancelSubscription(payload)),
});

export default UserCanTeam(connect(mapStateToProps, mapDispatchToProps)(Plans));
