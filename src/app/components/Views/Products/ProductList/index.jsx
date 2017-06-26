import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { List } from 'immutable';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import Subheader from 'material-ui/Subheader';
import MenuItem from 'material-ui/MenuItem';

import { getProductList } from '../../../../actions/productList';
import { addCartItem } from '../../../../actions/cart';
import { PageContainer, PageHeader } from '../../../Global/Page';
import Spinner from '../../../Global/Spinner';
import ResponsiveLayout from '../../../Global/Responsive';
import { Row, Column } from '../../../Global/Grid';
import ProductGrid from '../ProductGrid';
import styles from './styles';

export class ProductList extends Component {

  static propTypes = {
    products: PropTypes.object.isRequired,
    categories: PropTypes.object.isRequired,
    error: PropTypes.object,
    loading: PropTypes.bool.isRequired,
    match: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
  }

  static defaultProps = {
    error: {}
  }

  constructor(props) {

    super(props);

    this.state = {
      products: List(),
      sortBy: 'name'
    };

    this.handleFilter = this.handleFilter.bind(this);
    this.handleSort = this.handleSort.bind(this);
    this.addCartItem = this.addCartItem.bind(this);

  }

  componentDidMount() {

    const { dispatch, match } = this.props;

    dispatch(getProductList(match.params.category));

  }

  componentWillReceiveProps(nextProps) {

    const { match, dispatch } = this.props;

    if (nextProps.match.params.category !== match.params.category) {
      dispatch(getProductList(nextProps.match.params.category));
    }

    this.setState({
      products: nextProps.products
    });

  }

  getCategory() {

    let category = null;
    const { categories, match } = this.props;

    if (categories.size) {
      category = categories.find(item => item.get('id') === match.params.category);
    }

    return category;

  }

  handleFilter(event, newValue) {

    const { products } = this.props;
    const filtered = products.filter(item => {

      let inArray = false;
      const obj = item.toJS();

      Object.keys(obj).forEach(key => {
        if (obj[key].toString().toLowerCase().indexOf(newValue.toLowerCase()) !== -1) {
          inArray = true;
          return false;
        }
      });

      return (newValue === '' || inArray);

    });

    this.setState({
      products: filtered
    });

  }

  handleSort(event, key, payload) {

    let arr = this.state.products;

    this.setState({ products: List() });

    if (payload === 'price-asc' || payload === 'price-desc') {

      arr = arr.sortBy((item) => item.get('price'));

      if (payload === 'price-desc') {
        arr = arr.reverse();
      }

    } else {

      arr = arr.sortBy(item => item.get('name'));

    }

    this.setState({
      products: arr,
      sortBy: payload
    });

  }

  addCartItem(item) {
    this.props.dispatch(addCartItem(item, 1));
  }

  render() {

    const { products, loading, error, history } = this.props;
    const category = this.getCategory(products ? products.get(0) : null);

    const searchControl = (
      <TextField
        floatingLabelText='Filter Products'
        floatingLabelFixed={ true }
        hintText='Enter search criteria'
        onChange={ this.handleFilter }
        style={ styles.textField } />
    );

    const sortControl = (
      <SelectField
        floatingLabelText='Sort By'
        value={ this.state.sortBy }
        onChange={ this.handleSort }
        style={ styles.selectField }>
        <Subheader>Sort By</Subheader>
        <MenuItem value='name' primaryText='Name' />
        <MenuItem value='price-asc' primaryText='Price: Low to High' />
        <MenuItem value='price-desc' primaryText='Price High to Low' />
      </SelectField>
    );

    console.log(this.state.products);

    return (
      <PageContainer>
        {
          !loading ?
            <div>
              <PageHeader title={ category ? category.get('name') : 'Uncategorized Products' } />
              {
                products.size ?
                  <div>
                    <div style={ styles.toolbar }>
                      <ResponsiveLayout
                        medium={
                          <div>
                            <Row>
                              <Column span={ 12 }>{ searchControl }</Column>
                            </Row>
                            <Row>
                              <Column span={ 6 }>{ sortControl }</Column>
                            </Row>
                          </div>
                        }
                        large={
                          <Row>
                            <Column span={ 8 }>{ searchControl }</Column>
                            <Column span={ 4 }>{ sortControl }</Column>
                          </Row>
                        } />
                    </div>
                    <ProductGrid
                      products={ this.state.products }
                      addCartItem={ this.addCartItem }
                      pushState={ history.push }
                    />
                  </div> :
                  <p>There are no products in this category.</p>
              }
            </div> :
            <Spinner />
        }
      </PageContainer>
    );

  }

}

export default connect(state => ({
  products: state.productList.get('data'),
  categories: state.categories.get('data'),
  error: state.productList.get('error'),
  loading: state.productList.get('loading')
}))(ProductList);
