import React from 'react';
import { FormRadio } from 'shards-react';

import { IMAGE_PAYPAL } from '../../utils/constants';

const CustomRadioForm = () => {
  return (
    <div className="d-flex">
      <div className="d-flex flex-column mr-1 ml-1">
        <FormRadio checked className="mr-1 ml-1 d-inline-block">
          <img
            className="mr-2"
            width="30"
            src={IMAGE_PAYPAL}
            alt="Pay with PayPal"
          />
          <span>PayPal</span>
        </FormRadio>
      </div>
    </div>
  );
};

export default CustomRadioForm;
