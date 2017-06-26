import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { APP_NAME } from '../../../config/app';
import TopBar from './TopBar';
import MainMenu from './MainMenu';
import CartSidebar from './Cart';
import styles from './styles';

export default class CoreLayout extends Component {

  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array
    ]).isRequired,
    cart: PropTypes.object.isRequired,
    categories: PropTypes.object.isRequired
  }

  constructor() {

    super();

    this.state = {
      showMenu: false,
      showCart: false
    };

    this.toggleMenuDrawer = this.toggleMenuDrawer.bind(this);
    this.toggleCartDrawer = this.toggleCartDrawer.bind(this);

  }

  toggleMenuDrawer() {

    this.setState({
      showMenu: !this.state.showMenu
    });

  }

  toggleCartDrawer() {

    this.setState({
      showCart: !this.state.showCart
    });

  }

  render() {

    const { children, cart, categories } = this.props;

    return (
      <div>
        <TopBar
          title={ APP_NAME }
          toggleMenuDrawer={ this.toggleMenuDrawer }
          toggleCartDrawer={ this.toggleCartDrawer }
          cartItems={ cart }
        />
        <MainMenu
          open={ this.state.showMenu }
          onRequestChange={ this.toggleMenuDrawer }
          categories={ categories }
        />
        <CartSidebar
          open={ this.state.showCart }
          onRequestChange={ this.toggleCartDrawer }
        />
        <div style={ styles.content }>
          { children }
        </div>
      </div>
    );

  }

}
