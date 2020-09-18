import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import {
  Alert,
  Button,
  ButtonGroup,
  Col,
  Form,
  FormFeedback,
  FormInput,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row
} from 'shards-react';
import { isNumeric, matches } from 'validator';

import { REGEX_SHOP_NAME_MATCH } from '../../utils/constants';
import { validator } from '../../utils/helper';

const ShopsModal = ({
  attemptSubmit,
  data,
  events,
  errors,
  open,
  t,
  toggle
}) => {
  const { txtMobileNumber, txtShopName } = data;
  const { handleMobileNumber, handleShopName, submit } = events;
  const validMobileNumber = validator.isValidMobileNumber(txtMobileNumber);
  const validShopName = validator.isValidCompanyName(txtShopName);
  return (
    <Modal open={open} fade centered role="dialog">
      <ModalHeader closeAriaLabel="Close" toggle={toggle}>
        {t('translation.mdlTtlShop')}
      </ModalHeader>
      <ModalBody>
        {errors.map((error, index) => (
          <Alert
            key={index}
            fade
            theme="danger"
            className="outline-danger rounded"
          >
            <p className="mb-0">{error.message}</p>
          </Alert>
        ))}
        <Form>
          <Row form>
            <Col md="12" className="form-group">
              <FormInput
                id="txtShopName"
                type="text"
                placeholder={t('common.phShopName')}
                onChange={handleShopName}
                invalid={
                  txtShopName !== null &&
                  !matches(txtShopName, REGEX_SHOP_NAME_MATCH)
                }
              />
              <FormFeedback valid={validShopName}>
                {t('validation.errShopName')}
              </FormFeedback>
            </Col>
          </Row>
          <Row form>
            <Col md="12" className="form-group">
              <InputGroup className="mb-3">
                <InputGroupAddon type="prepend">
                  <InputGroupText>+63</InputGroupText>
                </InputGroupAddon>
                <FormInput
                  type="text"
                  id="txtMobileNumber"
                  placeholder={t('common.phMobileNumber')}
                  onChange={handleMobileNumber}
                  invalid={
                    txtMobileNumber !== null &&
                    (txtMobileNumber.length !== 10 ||
                      !isNumeric(txtMobileNumber))
                  }
                />
                <FormFeedback valid={validMobileNumber}>
                  {t('validation.errMobileNumber')}
                </FormFeedback>
              </InputGroup>
            </Col>
          </Row>
        </Form>
      </ModalBody>
      <ModalFooter>
        <div className="my-2 ml-auto">
          <ButtonGroup>
            <Button
              theme="success"
              onClick={submit}
              disabled={attemptSubmit || !validMobileNumber || !validShopName}
            >
              {attemptSubmit ? (
                <div>
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  />
                  <span className="sr-only">{t('common.lblLoading')}</span>
                </div>
              ) : (
                <div>
                  <span className="text-white">
                    <i className="material-icons">add</i>
                  </span>
                  {t('translation.btnCreateShop')}
                </div>
              )}
            </Button>
            <Button onClick={toggle} theme="white">
              <span>
                <i className="material-icons">close</i>
              </span>
              {t('translation.btnCancel')}
            </Button>
          </ButtonGroup>
        </div>
      </ModalFooter>
    </Modal>
  );
};

ShopsModal.defaultProps = {
  errors: [],
  open: false
};

ShopsModal.propTypes = {
  attemptSubmit: PropTypes.bool,
  data: PropTypes.object,
  errors: PropTypes.array,
  events: PropTypes.object,
  open: PropTypes.bool,
  toggle: PropTypes.func
};

export default withTranslation()(ShopsModal);
