import React from 'react';
import { Link } from 'react-router-dom';
import { Badge, ButtonGroup } from 'shards-react';
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
    Header: 'Type',
    accessor: 'type',
    className: 'text-center d-flex align-items-center',
    maxWidth: 150,
    sortable: false
  },
  {
    Header: 'Service Name',
    accessor: 'serviceName',
    maxWidth: 600,
    sortable: false,
    Cell: row => {
      return (
        <div>
          <Link to={`/service/${row.original.id}/edit`}>
            {row.original.name}
          </Link>
        </div>
      );
    }
  },
  {
    Header: 'Min',
    accessor: 'min',
    className: 'text-center d-flex align-items-center',
    maxWidth: 150,
    sortable: false,
    Cell: row => {
      return <div>{formatter.format(row.original.min)}</div>;
    }
  },
  {
    Header: 'Max',
    accessor: 'max',
    className: 'text-center d-flex align-items-center',
    maxWidth: 150,
    sortable: false,
    Cell: row => {
      return <div>{formatter.format(row.original.max)}</div>;
    }
  },
  {
    Header: 'Shops',
    accessor: 'shops',
    className: 'text-center d-flex align-items-center',
    sortable: false,
    Cell: row => {
      return row.original.shops.map((shop, index) => (
        <div key={index}>
          <Link to={`/shop/${shop.id}`}>
            <Badge
              pill
              theme="light"
              className="text-light text-capitalize mb-2 border mr-1"
            >
              {shop.name}
            </Badge>
          </Link>
        </div>
      ));
    }
  },
  {
    Header: 'Actions',
    accessor: 'actions',
    maxWidth: 100,
    className: 'text-center d-flex align-items-center',
    sortable: false,
    Cell: row => (
      <ButtonGroup size="sm" className="d-table">
        <Link
          to={`/service/${row.original.id}`}
          className="btn btn-warning text-white"
        >
          <i className="material-icons">edit</i>
        </Link>
      </ButtonGroup>
    )
  }
];
