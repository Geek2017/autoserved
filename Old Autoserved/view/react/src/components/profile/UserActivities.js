import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import ReactPlaceholder from 'react-placeholder';
import { TextBlock } from 'react-placeholder/lib/placeholders';
import { Button, Card, CardBody, CardFooter, CardHeader } from 'shards-react';

import { activityLog, colors } from '../../utils/helper';

const Placeholder = ({ repeat }) => {
  let component = [];

  while (repeat > 0) {
    component.push(
      <div key={repeat} className="user-activity__item pr-3 py-3">
        <div className="user-activity__item__icon" />
        <div className="user-activity__item__content w-100">
          <TextBlock color={colors.PLACEHOLDER_COLOR} rows={2} />
        </div>
      </div>
    );
    repeat--;
  }

  return <div>{component}</div>;
};

const UserActivities = ({ isFetching, logs, t }) => {
  return (
    <Card small>
      <CardHeader className="border-bottom ">
        <h6 className="m-0">{t('translation.ttlAccountActivities')}</h6>
      </CardHeader>
      <CardBody className="p-0">
        <ReactPlaceholder
          ready={!isFetching}
          showLoadingAnimation={true}
          customPlaceholder={<Placeholder repeat={3} />}
        >
          {logs.length ? (
            logs.map((entry, index) => activityLog(entry, index))
          ) : (
            <div className="user-activity__item pr-3 py-3">
              <div className="user-activity__item__icon">
                <i className="material-icons">close</i>
              </div>
              <div className="user-activity__item__content">
                <p>No logs found</p>
              </div>
            </div>
          )}
        </ReactPlaceholder>
      </CardBody>
      <CardFooter className="border-top text-center">
        <Button disabled={isFetching} size="sm" theme="white">
          Load more logs
        </Button>
      </CardFooter>
    </Card>
  );
};

UserActivities.propTypes = {
  logs: PropTypes.array,
  isFetching: PropTypes.bool
};

export default withTranslation()(UserActivities);
