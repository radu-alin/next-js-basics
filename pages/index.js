import Head from 'next/head';

import { getFeaturedEventsFirebase } from '../helpers/api-util';

import { EventList } from '../components/events/event-list/event-list';
import NewsletterRegistration from '../components/input/newsletter-registration';

const HomePage = (props) => {
  const { events } = props;

  return (
    <div>
      <Head>
        <meta
          name="description"
          content="Find a lot of great events that allow you to evolve..."
        />
        <title>NextJS Events</title>
      </Head>
      <NewsletterRegistration />
      <EventList items={events} />
    </div>
  );
};

export default HomePage;

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEventsFirebase();

  return {
    props: {
      events: featuredEvents,
    },
    revalidate: 30,
  };
}
