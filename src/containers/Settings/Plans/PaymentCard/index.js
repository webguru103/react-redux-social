/* eslint-disable camelcase */

import React, { PropTypes } from 'react';

import Button from 'elements/atm.Button';
import CardWrapper from '../CardWrapper';

const PaymentCard = ({ info: { name, brand, last4, exp_year, exp_month }, togglePayment }) => (
  <CardWrapper style={{ marginTop: '20px' }}>
    <div className="title-label">
      Payment
    </div>
    <div className="title">
      Information
    </div>
    <div className="divider" />
    {
      <div>
        <section>
          <div className="header">Name</div>
          <div className="value">{name}</div>
        </section>
        <section>
          <div className="header">{brand}</div>
          <div className="value">************{last4}</div>
        </section>
        <section>
          <div className="header">Expires</div>
          <div className="value">{exp_month} / {exp_year}</div>
        </section>
      </div>
    }

    <Button onClick={togglePayment}>
      Edit Info
    </Button>
  </CardWrapper>
);

PaymentCard.propTypes = {
  info: PropTypes.object,
  togglePayment: PropTypes.func,
};

export default PaymentCard;
