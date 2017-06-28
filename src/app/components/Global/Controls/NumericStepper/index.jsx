import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import Subheader from 'material-ui/Subheader';
import RemoveCircleIcon from 'material-ui/svg-icons/content/remove-circle';
import AddCircleIcon from 'material-ui/svg-icons/content/add-circle';

import styles from './styles';

export default class NumericStepper extends Component {

  static propTypes = {
    defaultValue: PropTypes.number,
    min: PropTypes.number,
    max: PropTypes.number,
    label: PropTypes.string,
    style: PropTypes.object,
    onChange: PropTypes.func
  }

  static defaultProps = {
    defaultValue: 1,
    min: 1,
    max: 10,
    label: 'Qty',
    style: null,
    onChange: () => {}
  };

  constructor(props) {

    super(props);

    this.state = {
      qty: this.props.defaultValue
    };

    this.addQty = this.addQty.bind(this);
    this.removeQty = this.removeQty.bind(this);

  }

  addQty() {

    let qty = this.state.qty + 1;
    qty = (qty > this.props.max ? this.props.max : qty);

    this.setState({ qty });
    this.props.onChange(qty);

  }

  removeQty() {

    let qty = this.state.qty - 1;
    qty = (qty < this.props.min ? this.props.min : qty);

    this.setState({ qty });
    this.props.onChange(qty);

  }

  render() {

    const { label, style } = this.props;

    return (
      <div style={ Object.assign({}, style, styles.wrapper) }>
        <Subheader style={ styles.label }>{ label }</Subheader>
        <div>
          <IconButton onTouchTap={ this.removeQty }>
            <RemoveCircleIcon />
          </IconButton>
        </div>
        <div style={ styles.qty }>
          { this.state.qty }
        </div>
        <div>
          <IconButton onTouchTap={ this.addQty }>
            <AddCircleIcon />
          </IconButton>
        </div>
      </div>
    );

  }

}
