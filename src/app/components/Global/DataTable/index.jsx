import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

export default class DataTable extends Component {

  static propTypes = {
    columns: PropTypes.arrayOf(PropTypes.object),
    rows: PropTypes.arrayOf(PropTypes.object)
  }

  render() {

    const { columns, rows } = this.props;

    return (
      <Table>
        <TableHeader>
          <TableRow>
            {
              columns.map((col, i) => {
                return (
                  <TableHeaderColumn key={ i }>
                    { col.label }
                  </TableHeaderColumn>     
                );
              })
            }
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            rows.map((row, i) => {
              return (
                <TableRow>
                  <TableRowColumn>

                  </TableRowColumn>
                </TableRow>
              );
            })
          }
        </TableBody>
      </Table>
    );

  }

}
