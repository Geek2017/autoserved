import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { Card, CardBody, CardFooter, CardHeader } from 'shards-react';

import { timeFormatter } from '../../utils/helper';

const OperatingHours = ({ data, t }) => {
  const { sun, mon, tue, wed, thu, fri, sat } = data;
  const days = [sun, mon, tue, wed, thu, fri, sat];
  return (
    <Card small className="mb-4">
      <CardHeader className="border-bottom">
        <h6 className="m-0">{t('translation.txtOperations')}</h6>
      </CardHeader>
      <CardBody className="px-2 border-bottom">
        <table className="table table-sm mb-0">
          <thead className="thead-light">
            <tr>
              <th scope="col" className="border-0 text-center py-2">
                Sunday
              </th>
              <th scope="col" className="border-0 text-center py-2">
                Monday
              </th>
              <th scope="col" className="border-0 text-center py-2">
                Tuesday
              </th>
              <th scope="col" className="border-0 text-center py-2">
                Wednesday
              </th>
              <th scope="col" className="border-0 text-center py-2">
                Thursday
              </th>
              <th scope="col" className="border-0 text-center py-2">
                Friday
              </th>
              <th scope="col" className="border-0 text-center py-2">
                Saturday
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {days.map((item, index) => (
                <td
                  key={index}
                  className={`${
                    item.open ? 'text-success' : 'text-danger'
                  } text-center`}
                >
                  <small className="font-weight-bold">
                    {!item.open
                      ? 'Closed'
                      : `${timeFormatter(item.start)} - ${timeFormatter(
                          item.end
                        )}`}
                  </small>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </CardBody>
      <CardFooter />
    </Card>
  );
};

OperatingHours.defaultProps = {
  data: []
};

OperatingHours.propTypes = {
  data: PropTypes.object
};

export default withTranslation()(OperatingHours);
