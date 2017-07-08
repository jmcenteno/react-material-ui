import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardText, CardActions } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';

import Utils from '../../../../services/utils';
import styles from './styles';

function Subtotal({ cartItems }) {

  let subtotalAmount = 0;

  if (cartItems.size) {
    subtotalAmount = cartItems.toJS()
      .map(item => item.product.price * item.qty)
      .reduce((a, b) => (a + b));
  }

  const component = (
    <Card>
      <Subheader>Subtotal</Subheader>
      <Divider />
      <CardText>
        <p style={ styles.subtotalAmount }>{ Utils.formatCurrency(subtotalAmount) }</p>
        <p>{ `${ cartItems.size } item(s)` }</p>
      </CardText>
      <CardActions>
        <RaisedButton label='Proceed to Checkout' primary={ true } fullWidth={ true } />
      </CardActions>
    </Card>
  );

  return component;

}

Subtotal.propTypes = {
  cartItems: PropTypes.object.isRequired
};

export default Subtotal;
