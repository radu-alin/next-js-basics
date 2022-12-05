import { getAllEvents } from '../../dummy-data';

import { EventList } from '../../components/events/event-list/event-list';

const EventsPage = () => {
  const events = getAllEvents();

  return (
    <div>
      <EventList items={events} />
    </div>
  );
};

export default EventsPage;