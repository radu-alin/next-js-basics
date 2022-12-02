import { Fragment } from 'react';
import { useRouter } from 'next/router';

import { EventList } from '../components/events/event-list/event-list';
import { EventsSearch } from '../components/events/events-search/events-search';
import { getFeaturedEvents } from '../dummy-data';

const HomePage = () => {
  const featuredEvents = getFeaturedEvents();
  const router = useRouter();

  const findEventsHandler = (year, month) => {
    const fullPath = `/events/${year}/${month}`;

    router.push(fullPath);
  };

  return (
    <Fragment>
      <EventsSearch onSearchAction={findEventsHandler} />
      <EventList items={featuredEvents} />
    </Fragment>
  );
};

export default HomePage;
