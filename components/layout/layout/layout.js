import { Fragment } from 'react';

import { MainHeader } from '../main-header/main-header';

export const Layout = (props) => {
  const { children } = props;
  return (
    <Fragment>
      <MainHeader />
      <main>{children}</main>
    </Fragment>
  );
};
