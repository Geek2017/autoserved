import React from 'react';
import moment from 'moment';
import prettysize from 'prettysize';
import { ButtonGroup, FormInput } from 'shards-react';
import { ACCEPTED_DOC_FILE_FORMATS } from '../constants';

export default t => [
  {
    Header: '',
    accessor: 'icon',
    maxWidth: 60,
    Cell: () => (
      <div className="file-manager__item-icon" tabIndex="0">
        <div>
          <i className="material-icons">insert_drive_file</i>
        </div>
      </div>
    )
  },
  {
    Header: 'Name',
    accessor: 'name',
    Cell: row => (
      <div>
        <a
          href={row.original.path ? row.original.path : '#'}
          rel="noopener noreferrer"
          target={row.original.path ? '_blank' : null}
        >
          <h5 className="file-manager__item-title">{row.original.name}</h5>{' '}
        </a>
        <span className="file-manager__item-meta">
          {row.original.updated_at
            ? `Last updated ${moment(row.original.updated_at).fromNow()}`
            : '-'}
        </span>
      </div>
    )
  },
  {
    Header: 'Size',
    accessor: 'size',
    maxWidth: 100,
    className: 'text-center d-flex align-items-center',
    Cell: row => <div>{prettysize(row.original.size)}</div>
  },
  {
    Header: 'File Name',
    accessor: 'filename',
    maxWidth: 300,
    className: 'text-center d-flex align-items-center text-wrap',
    Cell: row => (
      <a
        href={row.original.path ? row.original.path : '#'}
        rel="noopener noreferrer"
        target={row.original.path ? '_blank' : null}
      >
        {row.original.filename ? row.original.filename : '-'}
      </a>
    )
  },
  {
    Header: 'Actions',
    accessor: 'actions',
    maxWidth: 100,
    className: 'text-center d-flex align-items-center',
    Cell: row => (
      <div>
        <FormInput
          innerRef={ref => {
            if (ref) {
              ref.accept = ACCEPTED_DOC_FILE_FORMATS;
            }
          }}
          className="d-none"
          type="file"
          id={`file${row.index}`}
          onChange={row.original.handler}
        />
        <ButtonGroup size="sm" className="d-table">
          <label
            htmlFor={`file${row.index}`}
            className="btn btn-sm btn-success"
          >
            <i className="material-icons">cloud_upload</i>
          </label>
        </ButtonGroup>
      </div>
    )
  }
];
