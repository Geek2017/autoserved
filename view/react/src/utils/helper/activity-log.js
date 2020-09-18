import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Badge } from 'shards-react';

const APP_SHOP = 'App\\Shop';
const APP_UPLOAD = 'App\\Upload';
const APP_USER = 'App\\User';

const getColor = description =>
  description === 'created'
    ? 'success'
    : description === 'updated'
    ? 'warning'
    : 'danger';

const shopLog = (data, index) => (
  <div key={index} className="user-activity__item pr-3 py-3">
    <div className="user-activity__item__icon">
      <i className="material-icons">shop</i>
    </div>
    <div className="user-activity__item__content">
      <span className="text-light" title={data.created_at}>
        {moment(data.created_at).fromNow()}
      </span>
      <Badge
        className="ml-2 text-capitalize"
        theme={getColor(data.description)}
        pill
      >
        {data.description}
      </Badge>
      <p>Shop data has been {`${data.description}`}.</p>
    </div>
    <div className="user-activity__item__action ml-auto">
      <Link
        to={`/shop/${data.subject.slug}`}
        className="ml-auto btn btn-sm btn-white"
      >
        Visit Shop
      </Link>
    </div>
  </div>
);

const uploadLog = (data, index) => (
  <div key={index} className="user-activity__item pr-3 py-3">
    <div className="user-activity__item__icon">
      <i className="material-icons">attach_file</i>
    </div>
    <div className="user-activity__item__content">
      <span className="text-light" title={data.created_at}>
        {moment(data.created_at).fromNow()}
      </span>
      <Badge
        className="ml-2 text-capitalize"
        theme={getColor(data.description)}
        pill
      >
        {data.description}
      </Badge>
      <p>A file has been {`${data.description}`}.</p>
    </div>
  </div>
);

const userLog = (data, index) => (
  <div key={index} className="user-activity__item pr-3 py-3">
    <div className="user-activity__item__icon">
      <i className="material-icons">person</i>
    </div>
    <div className="user-activity__item__content">
      <span className="text-light" title={data.created_at}>
        {moment(data.created_at).fromNow()}
      </span>
      <Badge
        className="ml-2 text-capitalize"
        theme={getColor(data.description)}
        pill
      >
        {data.description}
      </Badge>
      <p>User data has been {`${data.description}`}.</p>
    </div>
  </div>
);

export default (entry, index) => {
  let component = null;

  switch (entry.subject_type) {
    case APP_SHOP: {
      component = shopLog(entry, index);
      break;
    }
    case APP_UPLOAD: {
      component = uploadLog(entry, index);
      break;
    }
    case APP_USER: {
      component = userLog(entry, index);
      break;
    }
    default: {
      component = null;
    }
  }

  return component;
};
