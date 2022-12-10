import { Fragment } from 'react';
import { useRouter } from 'next/router';

import { getAllEventsFirebase } from '../../helpers/api-util';

import Head from 'next/head';

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
      <Head>
        <meta
          name="description"
          content="Find a lot of great events that allow you to evolve..."
        />
        <title>All Events</title>
      </Head>
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
