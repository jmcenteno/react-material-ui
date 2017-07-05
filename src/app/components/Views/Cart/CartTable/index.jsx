import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';
import Checkbox from 'material-ui/Checkbox';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import RemoveIcon from 'material-ui/svg-icons/action/delete';
import { CardText, CardActions } from 'material-ui/Card';
import Divider from 'material-ui/Divider';

import { updateCart } from '../../../../actions/cart';
import Utils from '../../../../services/utils';
import { NumericStepperControl } from '../../../Global/Controls';
import styles from './styles';

export default class CartTable extends Component {

  static propTypes = {
    cartItems: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  constructor(props) {

    super();

    this.state = {
      cartItems: props.cartItems.toJS().map(item => {
        return Object.assign({}, item, {
          selected: false
        });
      }),
      selectAll: false
    };

    this.setState = this.setState.bind(this);
    this.select = this.select.bind(this);
    this.selectAll = this.selectAll.bind(this);
    this.remove = this.remove.bind(this);
    this.setQuantity = this.setQuantity.bind(this);
    this.removeSelected = this.removeSelected.bind(this);

  }

  componentWillReceiveProps(newProps) {

    const { cartItems } = this.state;

    this.setState({
      cartItems: newProps.cartItems.toJS().map((item, i) => {
        return Object.assign({}, item, {
          qty: item.qty,
          selected: cartItems[i].selected
        });
      })
    });

  }

  setQuantity(qty, index) {

    const { dispatch } = this.props;
    const { cartItems } = this.state;

    cartItems[index].qty = qty;

    this.setState({ cartItems });

    dispatch(updateCart(cartItems));

  }

  select(index) {

    const { cartItems } = this.state;
    let { selectAll } = this.state;

    cartItems[index].selected = !cartItems[index].selected;
    selectAll = (cartItems.filter(item => item.selected).length === cartItems.length);

    this.setState({
      cartItems,
      selectAll
    });

  }

  selectAll() {

    let { cartItems, selectAll } = this.state;

    selectAll = !selectAll;
    cartItems = cartItems.map(item => {
      return Object.assign({}, item, {
        selected: selectAll
      });
    });

    this.setState({
      cartItems,
      selectAll
    });

  }

  remove(index) {

    const { dispatch } = this.props;
    const { cartItems } = this.state;

    cartItems.splice(index, 1);

    this.setState({
      cartItems,
      selectAll: (cartItems.filter(item => item.selected).length === cartItems.length)
    });

    dispatch(updateCart(cartItems));

  }

  removeSelected() {

    const { dispatch } = this.props;
    const { cartItems } = this.state;

    this.setState({
      cartItems: cartItems.filter(item => !item.selected)
    });

    setTimeout(() => dispatch(updateCart(this.state.cartItems)), 100);

  }

  getSubtotal(cartItems = []) {

    if (cartItems.length) {
      return cartItems
        .map(item => item.product.price * item.qty)
        .reduce((a, b) => (a + b));
    }

    return 0;

  }

  render() {

    const { cartItems, selectAll } = this.state;
    const selected = cartItems.filter(item => item.selected);
    const subtotalAmount = this.getSubtotal(cartItems);

    return (
      <div>
        <div style={ { height: 48 } }>
          <CardActions style={ { display: selected.length ? 'block' : 'none' } }>
            <FlatButton
              label='Remove Selected'
              icon={ <RemoveIcon /> }
              onTouchTap={ this.removeSelected }
            />
          </CardActions>
        </div>
        <Table selectable={ false }>
          <TableHeader
            enableSelectAll={ false }
            displaySelectAll={ false }
            adjustForCheckbox={ false }>
            <TableRow>
              <TableHeaderColumn style={ { width: 64 } }>
                <Checkbox defaultChecked={ selectAll } onCheck={ this.selectAll } />
              </TableHeaderColumn>
              <TableHeaderColumn style={ { width: 56 } } />
              <TableHeaderColumn style={ { width: '25%' } }>Product</TableHeaderColumn>
              <TableHeaderColumn>Price Per Unit</TableHeaderColumn>
              <TableHeaderColumn>Qty.</TableHeaderColumn>
              <TableHeaderColumn>Total</TableHeaderColumn>
              <TableHeaderColumn style={ { width: 80 } } />
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={ false }>
            {
              cartItems.map((item, i) => {

                const product = item.product;
                const price = Utils.formatCurrency(product.price);
                const total = Utils.formatCurrency(product.price * item.qty);

                return (
                  <TableRow key={ `cart-item-${ i + 1 }` } striped={ true }>
                    <TableRowColumn style={ { width: 64 } }>
                      <Checkbox
                        defaultChecked={ item.selected }
                        onCheck={ () => this.select(i) }
                      />
                    </TableRowColumn>
                    <TableRowColumn style={ Object.assign({}, styles.tableBody.td, { width: 56 }) }>
                      <Avatar src={ product.pictures[0] } alt={ product.name } />
                    </TableRowColumn>
                    <TableRowColumn style={ { width: '25%', textTransform: 'capitalize', whiteSpace: 'wrap' } }>
                      <Link
                        to={ `/products/${ product.category }/${ product.slug }` }
                        style={ { fontSize: 16, textDecoration: 'none' } }>
                        { product.name }
                      </Link>
                      <br />
                      <Link
                        to={ `/products/${ product.category }` }
                        style={ { fontSize: 12, textDecoration: 'none' } }>
                        { product.category.name }
                      </Link>
                    </TableRowColumn>
                    <TableRowColumn>{ price }</TableRowColumn>
                    <TableRowColumn>
                      <NumericStepperControl
                        label=''
                        defaultValue={ item.qty }
                        onChange={ (qty) => this.setQuantity(qty, i) }
                        style={ { marginLeft: -12 } }
                      />
                    </TableRowColumn>
                    <TableRowColumn>{ total }</TableRowColumn>
                    <TableRowColumn style={ { width: 80, textAlign: 'right' } }>
                      <IconButton onTouchTap={ () => this.remove(i) }>
                        <RemoveIcon />
                      </IconButton>
                    </TableRowColumn>
                  </TableRow>
                );

              })
            }
          </TableBody>
        </Table>
        <Divider />
        <CardText style={ { textAlign: 'right' } }>
          Subtotal: { Utils.formatCurrency(subtotalAmount) }
        </CardText>
      </div>
    );

  }

}
