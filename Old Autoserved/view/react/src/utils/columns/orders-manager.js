import React from 'react';
import { Link } from 'react-router-dom';
// import { Badge, ButtonGroup } from 'shards-react';
import { formatter } from '../../utils/helper';

export default t => [
  {
    Header: '#',
    accessor: 'number',
    maxWidth: 60,
    sortable: false,
    Cell: row => <span>{row.index + 1}</span>
  },
  {
    Header: 'Date',
    accessor: 'date',
    className: 'text-center d-flex align-items-center',
    maxWidth: 350,
    sortable: false
  },
  {
    Header: 'Complete Name',
    accessor: 'completeName',
    maxWidth: 450,
    sortable: false,
    Cell: row => {
      return (
        <div>
          <Link to={`/order/${row.original.id}/edit`}>{row.original.name}</Link>
        </div>
      );
    }
  },
  {
    Header: 'Estimate Price',
    accessor: 'estimatePrice',
    className: 'text-center d-flex align-items-center',
    maxWidth: 350,
    sortable: false,
    Cell: row => {
      return <div>{formatter.format(row.original.min)}</div>;
    }
  },
  {
    Header: 'Status',
    accessor: 'status',
    className: 'text-center d-flex align-items-center',
    maxWidth: 350,
    sortable: false,
    Cell: row => {
      return <div>{formatter.format(row.original.max)}</div>;
    }
  }
];
