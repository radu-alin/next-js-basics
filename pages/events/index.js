import { Fragment } from 'react';
import { useRouter } from 'next/router';

import { getAllEventsFirebase } from '../../helpers/api-util';

import { EventsSearch } from '../../components/events/events-search/events-search';
import { EventList } from '../../components/events/event-list/event-list';

const EventsPage = (props) => {
  const router = useRouter();

  const { events } = props;

  const findEventsHandler = (year, month) => {
    const fullPath = `/events/${year}/${month}`;

    router.push(fullPath);
  };

  return (
    <Fragment>
      <EventsSearch onSearchAction={findEventsHandler} />
      <EventList items={events} />
    </Fragment>
  );
};

export default EventsPage;

export async function getStaticProps() {
  const events = await getAllEventsFirebase();

  return {
    props: {
      events,
    },
    revalidate: 30,
  };
}
