import React, { Component } from 'react';

import { PageContainer, PageHeader } from '../../Global/Page';

export default class NotFound extends Component {

  render() {

    const title = 'Page Not Found';

    return (
      <PageContainer title={ title }>
        <PageHeader title={ title } />
      </PageContainer>
    );

  }

}
