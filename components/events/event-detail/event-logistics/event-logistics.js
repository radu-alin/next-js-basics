import { AddressIcon } from '../../../icons/address.icon';
import { DateIcon } from '../../../icons/date-icon';
import { LogisticsItem } from '../../event-detail/logistics-item/logistics-item';

import classes from './event-logistics.module.css';

export const EventLogistics = (props) => {
  const { date, address, image, imageAlt } = props;

  const formatedDate = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const addressText = address.replace(', ', '\n');

  return (
    <section className={classes.logistics}>
      <div className={classes.image}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`/${image}`} alt={imageAlt} />
      </div>
      <ul className={classes.list}>
        <LogisticsItem icon={DateIcon}>
          <time>{formatedDate}</time>
        </LogisticsItem>
        <LogisticsItem icon={AddressIcon}>
          <address>{addressText}</address>
        </LogisticsItem>
      </ul>
    </section>
  );
};
