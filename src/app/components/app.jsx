import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './Layout';
import { getCategories } from '../actions/categories';
import HomePage from './Views/Home';
import About from './Views/About';
import { ProductList, ProductDetails } from './Views/Products';
import CartPage from './Views/Cart';
import NotFound from './Views/NotFound';

class App extends Component {

  static propTypes = {
    categories: PropTypes.object.isRequired,
    cart: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  componentDidMount() {

    this.props.dispatch(getCategories());

  }

  render() {

    const { categories, cart } = this.props;

    return (
      <Layout
        categories={ categories }
        cart={ cart }>
        <Switch>
          <Route exact path='/' component={ HomePage } />
          <Route exact path='/about' component={ About } />
          <Route exact path='/products/:category' component={ ProductList } />
          <Route exact path='/products/:category/:id' component={ ProductDetails } />
          <Route exact path='/cart' component={ CartPage } />

          <Route exact path='/404' component={ NotFound } />
          <Route path='*' component={ NotFound } />
        </Switch>
      </Layout>
    );

  }

}

export default connect(state => ({
  categories: state.categories.get('data'),
  cart: state.cart.get('items')
}))(App);
