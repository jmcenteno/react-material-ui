import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import ShoppingCartIcon from 'material-ui/svg-icons/action/shopping-cart';

import styles from './styles';

export default class TopBar extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    toggleMenuDrawer: PropTypes.func.isRequired,
    toggleCartDrawer: PropTypes.func.isRequired,
    cartItems: PropTypes.object.isRequired
  }

  render() {

    const { title, toggleMenuDrawer, toggleCartDrawer, cartItems } = this.props;

    const cartButton = (
      <IconButton iconStyle={ { color: '#fff' } } style={ { padding: 0, marginRight: 16 } } onTouchTap={ toggleCartDrawer }>
        {
          cartItems.size ?
            <Badge
              badgeContent={ cartItems.size }
              badgeStyle={ styles.badge }
              primary={ true }>
              <ShoppingCartIcon style={ { color: '#fff', marginTop: -12 } } />
            </Badge> :
            <ShoppingCartIcon style={ { color: '#fff' } } />
        }
      </IconButton>
    );

    return (
      <AppBar
        title={ title }
        onLeftIconButtonTouchTap={ toggleMenuDrawer }
        iconElementRight={
          <div>
            { cartButton }
          </div>
        }
        iconStyleRight={ cartItems.size ? styles.iconStyleRight : null }
        style={ styles.appBar }
      />
    );

  }

}
