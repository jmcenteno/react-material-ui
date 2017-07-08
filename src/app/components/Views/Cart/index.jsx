import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CardText } from 'material-ui/Card';

import { PageContainer, PageHeader } from '../../Global/Page';
import ResponsiveLayout from '../../Global/Responsive';
import { Row, Column } from '../../Global/Grid';
import CartTable from './CartTable';
import Subtotal from './Subtotal';

function mapStateToProps(state) {
  return {
    cartItems: state.cart.get('items')
  };
}

export class Cart extends Component {

  static propTypes = {
    cartItems: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  render() {

    const { cartItems, dispatch } = this.props;

    return (
      <PageContainer>
        <PageHeader title='Your Shopping Cart' />
        {
          cartItems.size ?
            <ResponsiveLayout
              medium={
                <div>
                  <Row>
                    <Column span={ 12 }>
                      <Subtotal cartItems={ cartItems } />
                    </Column>
                  </Row>
                  <Row>
                    <Column span={ 12 }>
                      <CartTable cartItems={ cartItems } dispatch={ dispatch } />
                    </Column>
                  </Row>
                </div>
              }
              large={
                <div>
                  <Row>
                    <Column span={ 9 }>
                      <CartTable cartItems={ cartItems } dispatch={ dispatch } />
                    </Column>
                    <Column span={ 3 }>
                      <Subtotal cartItems={ cartItems } />
                    </Column>
                  </Row>
                </div>
              }
            /> :
            <CardText>
              <p style={ { textAlign: 'center' } }>Your cart is empty</p>
            </CardText>
        }
      </PageContainer>
    );
  }

}

export default connect(mapStateToProps)(Cart);
