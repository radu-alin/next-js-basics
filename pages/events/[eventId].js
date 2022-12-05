import { useRouter } from 'next/router';
import { Fragment } from 'react';

import { EventContent } from '../../components/events/event-detail/event-content/event-content';
import { EventLogistics } from '../../components/events/event-detail/event-logistics/event-logistics';
import { EventSummary } from '../../components/events/event-detail/event-summary/event-summary';
import { ErrorAlert } from '../../components/ui/error-alert/error-alert';

import { getEventById } from '../../dummy-data';

const EventDetail = () => {
  const router = useRouter();

  const eventId = router.query.eventId;
  const event = getEventById(eventId);

  if (!event) {
    <ErrorAlert>
      <p>No event found!</p>
    </ErrorAlert>;
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
