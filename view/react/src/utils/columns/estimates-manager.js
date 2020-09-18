import React from 'react';
// import { Link } from 'react-router-dom';
// import { Badge, ButtonGroup } from 'shards-react';
// import { formatter } from '../../utils/helper';

export default t => [
  {
    Header: '#',
    accessor: 'number',
    maxWidth: 60,
    sortable: false,
    Cell: row => <span>{row.index + 1}</span>
  },
  {
    Header: 'Make',
    accessor: 'carMake',
    maxWidth: 150,
    sortable: false,
    Cell: row => {
      return <div>{row.original.car_make}</div>;
    }
  },
  {
    Header: 'Year',
    accessor: 'carYear',
    maxWidth: 150,
    sortable: false,
    Cell: row => {
      return <div>{row.original.caryear}</div>;
    }
  },
  {
    Header: 'Model',
    accessor: 'carModel',
    maxWidth: 150,
    sortable: false,
    Cell: row => {
      return <div>{row.original.car_model}</div>;
    }
  },
  {
    Header: 'Serie',
    accessor: 'carSerie',
    maxWidth: 150,
    sortable: false,
    Cell: row => {
      return <div>{row.original.car_serie}</div>;
    }
  },
  {
    Header: 'Trim',
    accessor: 'carTrim',
    maxWidth: 150,
    sortable: false,
    Cell: row => {
      return <div>{row.original.car_trim}</div>;
    }
  },
  {
    Header: 'Current Mileage',
    accessor: 'currentMileage',
    className: 'text-center d-flex align-items-center',
    maxWidth: 350,
    sortable: false,
    Cell: row => {
      return <div>{row.original.current_mileage}</div>;
    }
  },
  {
    Header: 'Last Serviced',
    accessor: 'lastServiced',
    className: 'text-center d-flex align-items-center',
    maxWidth: 350,
    sortable: false,
    Cell: row => {
      return <div>{row.original.last_serviced}</div>;
    }
  }
];
