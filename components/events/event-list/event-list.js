import { EventItem } from '../event-item/event-item';

import classes from './event-list.module.css';

export const EventList = (props) => {
  const { items } = props;

  const renderItems = (() =>
    items.map((item) => (
      <EventItem
        key={item.id}
        id={item.id}
        title={item.title}
        date={item.date}
        location={item.location}
        image={item.image}
      />
    )))();

  return <ul className={classes.list}>{renderItems}</ul>;
};
