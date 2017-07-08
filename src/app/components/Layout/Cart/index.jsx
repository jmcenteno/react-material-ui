import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Drawer from 'material-ui/Drawer';
import { List, ListItem } from 'material-ui/List';
import { CardTitle, CardText } from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import RemoveIcon from 'material-ui/svg-icons/action/delete';

import { removeCartItem } from '../../../actions/cart';
import Utils from '../../../services/utils';
import styles from './styles';

export class Cart extends Component {

  static propTypes = {
    open: PropTypes.bool.isRequired,
    onRequestChange: PropTypes.func.isRequired,
    items: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  getSubtotal() {

    const { items } = this.props;
    let subtotal = 0;

    items.forEach(item => {
      subtotal += (item.get('product').get('price') * item.get('qty'));
    });

    return subtotal > 0 ? Utils.formatCurrency(subtotal) : 0;

  }

  removeCartItem(event, index) {
    event.stopPropagation();
    this.props.dispatch(removeCartItem(index));
  }

  render() {

    const { items, open, onRequestChange } = this.props;

    const title = (
      <span>
        Cart
        <IconButton onTouchTap={ onRequestChange } style={ styles.closeButton }>
          <CloseIcon />
        </IconButton>
      </span>
    );

    return (
      <Drawer
        open={ open }
        openSecondary={ true }
        docked={ false }
        onRequestChange={ onRequestChange }
        width={ 320 }
        containerStyle={ styles.drawer }>
        <CardTitle title={ title } />
        <Divider />
        <div style={ styles.cartBody }>
          {
            items.size ?
              <List style={ styles.list }>
                {
                  items.map((item, i) => {

                    const product = item.get('product');
                    const path = `/products/${ product.get('category') }/${ product.get('slug') }`;
                    const price = Utils.formatCurrency(product.get('price'));
                    const removeButton = (
                      <IconButton onTouchTap={ (event) => this.removeCartItem(event, i) }>
                        <RemoveIcon />
                      </IconButton>
                    );

                    return (
                      <ListItem
                        key={ `cart-item-${ i + 1 }` }
                        value='about'
                        containerElement={ <Link to={ path } /> }
                        primaryText={ product.get('name') }
                        secondaryText={
                          `${ price } x ${ item.get('qty') }`
                        }
                        leftAvatar={ <Avatar src={ product.get('pictures').get(0) } /> }
                        rightIconButton={ removeButton }
                        style={ { textTransform: 'capitalize' } }
                      />
                    );

                  })
                }
              </List> :
              <CardText style={ { textAlign: 'center' } }>
                Your cart is empty
              </CardText>
          }
          <div>
            {
              items.size ?
                <div>
                  <Divider />
                  <CardText style={ styles.footer }>
                    Subtotal: { this.getSubtotal() }
                  </CardText>
                  <Divider />
                  <CardText style={ styles.actionButtonsWrapper }>
                    <FlatButton
                      label='View Cart'
                      primary={ true }
                      onTouchTap={ onRequestChange }
                      containerElement={ <Link to='/cart' /> }
                      style={ Object.assign({}, styles.actionButton, { marginRight: 8 }) }
                    />
                    <RaisedButton label='Checkout' primary={ true } style={ Object.assign({}, styles.actionButton, { marginLeft: 8 }) } />
                  </CardText>
                </div> :
                null
            }
          </div>
        </div>
      </Drawer>
    );

  }

}

export default connect(state => ({
  items: state.cart.get('items')
}))(Cart);
