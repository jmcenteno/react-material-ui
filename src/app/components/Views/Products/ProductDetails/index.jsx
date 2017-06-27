import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { List } from 'immutable';
import { CardTitle, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';

import { getProductDetails } from '../../../../actions/productDetails';
import { addCartItem } from '../../../../actions/cart';
import { PageContainer } from '../../../Global/Page';
import ResponsiveLayout from '../../../Global/Responsive';
import { Row, Column } from '../../../Global/Grid';
import NumericStepper from '../../../Global/Controls/NumericStepper';
import Spinner from '../../../Global/Spinner';
import Utils from '../../../../services/utils';
import ProductImages from './Images';
import Tabs from './Tabs';
import RelatedProducts from './RelatedProducts';
import StarRatings from '../StarRatings';
import styles from './styles';

export class ProductDetails extends Component {

  static propTypes = {
    product: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }

  constructor() {

    super();

    this.state = {
      activeTab: 0
    };

    this.setState = this.setState.bind(this);
    this.addToCart = this.addToCart.bind(this);

  }

  componentDidMount() {

    const { dispatch, match } = this.props;

    dispatch(getProductDetails(match.params.category, match.params.id));

  }

  componentWillReceiveProps(newProps) {

    if (newProps.error) {
      //this.props.match.replace('/404');
    }

    const { dispatch, match } = this.props;

    if (newProps.match.params.category !== match.params.category ||
        newProps.match.params.id !== match.params.id) {

      dispatch(getProductDetails(newProps.match.params.category, newProps.match.params.id));

    }

  }

  addToCart() {

    const { product, dispatch } = this.props;
    const { qty } = this.qtyControl.state;

    dispatch(addCartItem(product.toJS(), qty));

  }

  render() {

    const { product, loading, history } = this.props;
    const reviews = Utils.makeArray((product.get('reviews') || List()).toJS());

    let title = null;
    let productImages = null;
    let addToCartControl = null;
    let tabs = null;
    let relatedProducts = null;

    if (!loading) {

      title = (
        <CardTitle
          title={ product.get('name') }
          subtitle={
            <div>
              { `Price: ${ Utils.formatCurrency(product.get('price')) }` }
              <StarRatings
                stars={ Utils.calculateRatings(reviews) }
                style={ styles.stars }
              />
              <span>{ `${ reviews.size || 0 } reviews` }</span>
            </div>
          }
          titleStyle={styles.title}
        />
      );

      if (product.get('price')) {

        addToCartControl = (
          <div>
            <div style={ { display: 'inline-block' } }>
              <NumericStepper
                ref={ (control) => this.qtyControl = control }
                label='Qty'
                defaultValue={ 1 }
                style={ styles.numericStepper } />
            </div>
            <RaisedButton
              label='Add to Cart'
              primary={ true }
              onTouchTap={ this.addToCart }
            />
          </div>
        );

      }

      productImages = (
        <div style={ styles.productImages }>
          <ProductImages images={ product.get('pictures') || List() } />
        </div>
      );

      tabs = (
        <div>
          <Tabs product={ product } style={ { marginBottom: 32 } } />
          <Divider style={ { marginBottom: 32 } } />
        </div>
      );

      relatedProducts = (
        <RelatedProducts
          products={ product.get('relatedProducts') || List() }
          pushState={ history.push }
        />
      );

    }

    return (
      <PageContainer>
        {
          !loading ?
            <div>
              <ResponsiveLayout
                medium={
                  <div>
                    <Row>
                      <Column span={ 12 }>
                        { title }
                        <CardText>
                          { addToCartControl }
                        </CardText>
                      </Column>
                    </Row>
                    <Row>
                      <Column span={ 12 }>{ productImages }</Column>
                    </Row>
                    <Row>
                      <Column span={ 12 }>{ tabs }</Column>
                    </Row>
                    <Row>
                      <Column span={ 12 }>{ relatedProducts }</Column>
                    </Row>
                  </div>
                }
                large={
                  <div>
                    <Row>
                      <Column span={ 7 }>{ productImages }</Column>
                      <Column span={ 5 }>
                        { title }
                        <CardText>
                          { addToCartControl }
                        </CardText>
                      </Column>
                    </Row>
                    <Row>
                      <Column span={ 12 }>{ tabs }</Column>
                    </Row>
                    <Row>
                      <Column span={ 12 }>{ relatedProducts }</Column>
                    </Row>
                  </div>
                } />
            </div> :
            <Spinner />
        }
      </PageContainer>
    );

  }

}

export default connect(state => ({
  product: state.productDetails.get('data'),
  loading: state.productDetails.get('loading'),
  error: state.productDetails.get('error')
}))(ProductDetails);
