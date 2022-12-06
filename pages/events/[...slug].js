import { Fragment } from 'react';

import { getFilteredEventsFirebase } from '../../helpers/api-util';

import { EventList } from '../../components/events/event-list/event-list';
import { ResultsTitle } from '../../components/events/results-title/results-title';
import { Button } from '../../components/ui/button/button';
import { ErrorAlert } from '../../components/ui/error-alert/error-alert';

const FilteredEvents = (props) => {
  const { filteredEvents, filteredDate, hasError } = props;

  if (hasError) {
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

  const date = new Date(filteredDate.year, filteredDate.month - 1);

  return (
    <Fragment>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
};

export default FilteredEvents;

export async function getServerSideProps(context) {
  const { params } = context;
  const filterData = params.slug;

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
    return {
      props: { hasError: true },
    };
  }

  const filteredEvents = await getFilteredEventsFirebase({
    year: filteredYear,
    month: filteredMonth,
  });

  return {
    props: {
      filteredEvents,
      filteredDate: {
        year: filteredYear,
        month: filteredMonth,
      },
    },
  };
}
