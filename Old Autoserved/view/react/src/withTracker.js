import React, { Component } from 'react';
import GoogleAnalytics from 'react-ga';

// To be updated with our own Google Analytics ID
GoogleAnalytics.initialize(process.env.REACT_APP_GAID || 'UA-115105611-2');

const withTracker = (WrappedComponent, options = {}) => {
  const trackPage = page => {
    if (process.env.NODE_ENV === 'production') {
      GoogleAnalytics.set({
        page,
        ...options
      });
      GoogleAnalytics.pageview(page);
    }
  };

  const BASENAME = process.env.REACT_APP_BASENAME || '';

  const HOC = class extends Component {
    componentDidMount = () => {
      const { pathname, search } = this.props.location;
      const page = pathname + search;
      trackPage(`${BASENAME} - ${page}`);
    };

    componentDidUpdate = prevProps => {
      const { pathname, search } = this.props.location;
      const { pathname: prevPathname, search: prevSearch } = prevProps.location;
      const currentPage = prevPathname + prevSearch;
      const nextPage = pathname + search;

      if (currentPage !== nextPage) {
        trackPage(`${BASENAME} - ${nextPage}`);
      }
    };

    render = () => {
      return <WrappedComponent {...this.props} />;
    };
  };

  return HOC;
};

export default withTracker;
