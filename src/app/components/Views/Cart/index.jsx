import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import { CardText } from 'material-ui/Card';
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
import RemoveIcon from 'material-ui/svg-icons/action/delete';

import Utils from '../../../services/utils';
import { PageContainer, PageHeader } from '../../Global/Page';
import { NumericStepperControl as QtyControl } from '../../Global/Controls';
import styles from './styles';

function mapStateToProps(state) {
  return {
    cartItems: state.cart.get('items')
  };
}

export class Cart extends Component {

  static propTypes = {
    cartItems: PropTypes.object.isRequired
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

  }

  componentWillReceiveProps(newProps) {

    this.setState({
      cartItems: newProps.cartItems.toJS().map(item => {
        return Object.assign({}, item, {
          selected: false
        });
      })
    });

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

    const { cartItems } = this.state;

    cartItems.splice(index, 1);

    this.setState({
      cartItems,
      selectAll: (cartItems.filter(item => item.selected).length === cartItems.length)
    });

  }

  setQuantity(qty, index) {

    const { cartItems } = this.state;

    cartItems[index].qty = qty;

    this.setState({ cartItems });

  }

  render() {

    const { cartItems, selectAll } = this.state;

    return (
      <PageContainer>
        <PageHeader title='Your Cart' />
        {
          cartItems.length ?
            <Paper>
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
                    <TableHeaderColumn>Name</TableHeaderColumn>
                    <TableHeaderColumn>Price Per Unit</TableHeaderColumn>
                    <TableHeaderColumn>Qty.</TableHeaderColumn>
                    <TableHeaderColumn>Total</TableHeaderColumn>
                    <TableHeaderColumn />
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
                          <TableRowColumn>{ product.name }</TableRowColumn>
                          <TableRowColumn>{ price }</TableRowColumn>
                          <TableRowColumn>
                            <QtyControl
                              label=''
                              defaultValue={ item.qty }
                              onChange={ (qty) => this.setQuantity(qty, i) }
                            />
                          </TableRowColumn>
                          <TableRowColumn>{ total }</TableRowColumn>
                          <TableRowColumn style={ { textAlign: 'right' } }>
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
            </Paper> :
            <CardText>
              <p>Your cart is empty</p>
            </CardText>
        }
      </PageContainer>
    );
  }

}

export default connect(mapStateToProps)(Cart);
