import React from 'react';
import { withTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Container } from 'shards-react';

const ErrorPage = ({ t, history }) => (
  <Container fluid className="main-content-container px-4 pb-4">
    <div className="error">
      <div className="error__content">
        <h2>{t('translation.txtError404')}</h2>
        <h3>{t('translation.txtError404Message')}</h3>
        <p>{t('translation.txtError404SubMessage')}</p>
        <Link onClick={history.goBack} to="/">
          <span className="btn btn-primary btn-pill">
            &larr; {t('translation.btnGoBack')}
          </span>
        </Link>
      </div>
    </div>
  </Container>
);

export default withTranslation()(ErrorPage);
