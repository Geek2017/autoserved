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
    Header: 'Schedule',
    accessor: 'carSchedule',
    maxWidth: 250,
    sortable: false,
    Cell: row => {
      return <div>{row.original.schedule}</div>;
    }
  },
  {
    Header: 'Mileage',
    accessor: 'carMileage',
    maxWidth: 250,
    sortable: false,
    Cell: row => {
      return <div>{row.original.mileage}</div>;
    }
  },
  {
    Header: 'Requirements',
    accessor: 'carRequirements',
    maxWidth: 550,
    sortable: false,
    Cell: row => {
      return <div>{row.original.requirements}</div>;
    }
  },
  {
    Header: 'Notes',
    accessor: 'carNotes',
    maxWidth: 450,
    sortable: false,
    Cell: row => {
      return <div>{row.original.car_serie}</div>;
    }
  }
];
