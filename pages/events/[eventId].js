import { Fragment } from 'react';

import { EventContent } from '../../components/events/event-detail/event-content/event-content';
import { EventLogistics } from '../../components/events/event-detail/event-logistics/event-logistics';
import { EventSummary } from '../../components/events/event-detail/event-summary/event-summary';
import { ErrorAlert } from '../../components/ui/error-alert/error-alert';
import { getEventByIdFirebase, getFeaturedEventsFirebase } from '../../helpers/api-util';

const EventDetail = (props) => {
  const { event } = props;

  if (!event) {
    return (
      <ErrorAlert>
        <p>Loading...</p>
      </ErrorAlert>
    );
  }

  return (
    <Fragment>
      <EventSummary title={event.title} />
      <EventLogistics
        title={event.title}
        date={event.date}
        address={event.location}
        image={event.image}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
};

export default EventDetail;

export async function getStaticProps(context) {
  const eventId = context.params.eventId;
  const event = await getEventByIdFirebase(eventId);

  if (!event) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      event,
    },
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  const events = await getFeaturedEventsFirebase();

  const paths = events.map((event) => ({ params: { eventId: 'e1' } }));

  return {
    paths,
    fallback: true,
  };
}
