import React from 'react';
import PropTypes from 'prop-types';
import { CardText } from 'material-ui/Card';
import Subheader from 'material-ui/Subheader';

import styles from './styles';

function Specs({ data, title, ...rest }) {

  const component = (
    <div>
      <Subheader>{ title }</Subheader>
      <table style={ styles.table }>
        <tbody>
          {
            data.map((item, i) => {
              return (
                <tr key={ i }>
                  <td style={ styles.td }>
                    <CardText style={ styles.cardText }>
                      { item.get('label') }
                    </CardText>
                  </td>
                  <td style={ Object.assign({}, styles.td, styles.value) }>
                    <CardText style={ styles.cardText }>
                      { item.get('value') }
                    </CardText>
                  </td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    </div>
  );

  return React.cloneElement(component, rest);

}

Specs.propTypes = {
  data: PropTypes.object.isRequired,
  title: PropTypes.string
};

Specs.defaultProps = {
  title: 'Technical Specs'
};

export default Specs;
