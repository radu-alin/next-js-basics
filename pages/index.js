import { getFeaturedEventsFirebase } from '../helpers/api-util';

import { EventList } from '../components/events/event-list/event-list';

const HomePage = (props) => {
  const { events } = props;

  return (
    <div>
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
