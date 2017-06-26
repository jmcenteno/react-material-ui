import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Drawer from 'material-ui/Drawer';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Subheader from 'material-ui/Subheader';
import HomeIcon from 'material-ui/svg-icons/action/home';

import UserInfo from '../UserInfo';

export default class MainMenu extends Component {

  static propTypes = {
    open: PropTypes.bool.isRequired,
    onRequestChange: PropTypes.func.isRequired,
    categories: PropTypes.object.isRequired
  }

  render() {

    const {
      open,
      onRequestChange,
      categories
    } = this.props;

    return (
      <Drawer open={ open } docked={ false } onRequestChange={ onRequestChange }>
        <UserInfo />
        <Menu onChange={ onRequestChange }>
          <MenuItem
            value='dashboard'
            containerElement={ <Link to='/' /> }
            leftIcon={ <HomeIcon /> }>
            Home
          </MenuItem>
          <MenuItem
            value='about'
            containerElement={ <Link to='/about' /> }>
            About
          </MenuItem>
          <Subheader>Products</Subheader>
          {
            categories.map((item, i) => (
              <MenuItem
                key={ i }
                value={ item.get('id') }
                containerElement={ <Link to={ `/products/${ item.get('id') }` } /> }>
                { item.get('name') }
              </MenuItem>
            ))
          }
        </Menu>
      </Drawer>
    );

  }

}
