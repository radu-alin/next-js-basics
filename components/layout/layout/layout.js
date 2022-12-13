import { Fragment, useContext } from 'react';

import NotificationContext from '../../../store/notification-context';

import { MainHeader } from '../main-header/main-header';
import Notification from '../../ui/notification/notification';

export const Layout = (props) => {
  const notificationCtx = useContext(NotificationContext);
  const activeNotification = notificationCtx.notification;

  const { children } = props;

  return (
    <Fragment>
      <MainHeader />
      <main>{children}</main>
      {activeNotification && (
        <Notification
          title={activeNotification.title}
          message={activeNotification.message}
          status={activeNotification.status}
        />
      )}
    </Fragment>
  );
};
