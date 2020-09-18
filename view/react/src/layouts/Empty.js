import React from 'react';
import DefaultLayout from './Default';

const EmptyLayout = ({ children }) => (
  <DefaultLayout noSidebar noNavbar noFooter>
    {children}
  </DefaultLayout>
);

export default EmptyLayout;
