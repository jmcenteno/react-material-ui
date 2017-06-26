import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import App from './components/app';

class Root extends React.Component {

  static propTypes = {
    store: PropTypes.object.isRequired
  }

  render() {

    return (
      <MuiThemeProvider>
        <Provider store={ this.props.store }>
          <BrowserRouter>
            <Route path='/' component={ App } />
          </BrowserRouter>
        </Provider>
      </MuiThemeProvider>
    );

  }

}

export default Root;
