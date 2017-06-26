import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import Subheader from 'material-ui/Subheader';

import styles from './styles';

export default class NumericStepper extends Component {

  static propTypes = {
    defaultValue: PropTypes.number,
    min: PropTypes.number,
    max: PropTypes.number,
    label: PropTypes.string,
    style: PropTypes.object
  }

  static defaultProps = {
    defaultValue: 1,
    min: 1,
    max: 10,
    label: 'Qty',
    style: null
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

    const qty = this.state.qty + 1;

    this.setState({
      qty: (qty > this.props.max ? this.props.max : qty)
    });

  }

  removeQty() {

    const qty = this.state.qty - 1;

    this.setState({
      qty: (qty < this.props.min ? this.props.min : qty)
    });

  }

  render() {

    const { label, style } = this.props;

    return (
      <div style={ Object.assign({}, style, styles.wrapper) }>
        <Subheader style={ styles.label }>{ label }</Subheader>
        <div>
          <IconButton onTouchTap={ this.removeQty }>
            <FontIcon className='material-icons remove_circle' />
          </IconButton>
        </div>
        <div style={ styles.qty }>
          { this.state.qty }
        </div>
        <div>
          <IconButton onTouchTap={ this.addQty }>
            <FontIcon className='material-icons add_circle' />
          </IconButton>
        </div>
      </div>
    );

  }

}
