import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab } from 'material-ui/Tabs';

import Description from './Description';
import Reviews from './Reviews';
import styles from './styles';

export default class ProductTabs extends Component {

  static propTypes = {
    product: PropTypes.object.isRequired,
    style: PropTypes.object
  }

  static defaultProps = {
    styles: {}
  }

  constructor() {

    super();

    this.state = {
      activeTab: 0
    };

    this.setState = this.setState.bind(this);

  }

  render() {

    const { product, style } = this.props;

    return (
      <Tabs
        tabItemContainerStyle={ styles.tabItemContainer }
        inkBarStyle={ styles.tabInkBarStyle }
        style={ style }>
        <Tab
          label='Description'
          style={ this.state.activeTab === 0 ? styles.tabRoot.active : styles.tabRoot.default }
          buttonStyle={ styles.tabButtonStyle }
          onActive={ () => this.setState({ activeTab: 0 }) }>
          <Description product={ product } />
        </Tab>
        <Tab
          label='Customer Reviews'
          style={ this.state.activeTab === 1 ? styles.tabRoot.active : styles.tabRoot.default }
          buttonStyle={ styles.tabButtonStyle }
          onActive={ () => this.setState({ activeTab: 1 }) }>
          <Reviews product={ product } />
        </Tab>
      </Tabs>
    );

  }

}
