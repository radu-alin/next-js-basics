import Image from 'next/image';

import { Button } from '../../ui/button/button';

import { DateIcon } from '../../icons/date-icon';
import { AddressIcon } from '../../icons/address.icon';
import { ArrowRightIcon } from '../../icons/arrow-right-icon';

import classes from './event-item.module.css';

export const EventItem = (props) => {
  const { id, title, date, location, image } = props;

  const formatedDate = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const formattedAddress = location.replace(', ', '\n');

  const exploreLink = `/events/${id}`;

  return (
    <li className={classes.item}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <Image src={'/' + image} alt={title} width={250} height={160} priority />
      {/* <img src={'/' + image} alt={title} /> */}
      <div className={classes.content}>
        <div className={classes.summary}>
          <h2>{title}</h2>
          <div className={classes.date}>
            <DateIcon />
            <time>{formatedDate}</time>
          </div>
          <div className={classes.address}>
            <AddressIcon />
            <address>{formattedAddress}</address>
          </div>
        </div>
        <div className={classes.actions}>
          <Button link={exploreLink}>
            <span>Explore Event</span>
            <span className={classes.icon}>
              <ArrowRightIcon />
            </span>
          </Button>
        </div>
      </div>
    </li>
  );
};
