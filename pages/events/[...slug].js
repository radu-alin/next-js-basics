import { Fragment } from 'react';
import { useRouter } from 'next/router';

import { getFilteredEvents } from '../../dummy-data';

import { EventList } from '../../components/events/event-list/event-list';
import { ResultsTitle } from '../../components/events/results-title/results-title';
import { Button } from '../../components/ui/button/button';
import { ErrorAlert } from '../../components/ui/error-alert/error-alert';

const FilteredEvents = () => {
  const router = useRouter();

  const filterData = router.query.slug;

  if (!filterData) {
    return <p className="center">Loading...</p>;
  }

  const filteredYear = Number(filterData[0]);
  const filteredMonth = Number(filterData[1]);

  if (
    isNaN(filteredYear) ||
    isNaN(filteredMonth) ||
    filteredYear > 2030 ||
    filteredYear < 2021 ||
    filteredMonth < 1 ||
    filteredMonth > 12
  ) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>Invalid filter, please adjust your values.</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const filteredEvents = getFilteredEvents({ year: filteredYear, month: filteredMonth });

  const noEvents = !filteredEvents || filteredEvents.length === 0;

  if (noEvents) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>No events found for the selected dates!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const date = new Date(filteredYear, filteredMonth - 1);

  return (
    <Fragment>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
};

export default FilteredEvents;
