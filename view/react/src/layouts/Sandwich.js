import React from 'react';
import DefaultLayout from './Default';

const SandwichLayout = ({ children }) => (
  <DefaultLayout noSidebar noLogo={false}>
    {children}
  </DefaultLayout>
);

export default SandwichLayout;
