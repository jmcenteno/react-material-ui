import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { PageContainer, PageHeader } from '../../Global/Page';

export class Home extends Component {

  static propTypes = {
    dispatch: PropTypes.func
  }

  render() {

    return (
      <PageContainer>
        <PageHeader
          title='Marvin'
          subtitle='Boilerplate for kicking off React/Redux applications.'
        />

      </PageContainer>
    );

  }

}

export default connect(state => ({
  asyncData: state.app.get('asyncData'),
  asyncError: state.app.get('asyncError'),
  asyncLoading: state.app.get('asyncLoading'),
  counter: state.app.get('counter')
}))(Home);
