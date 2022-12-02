import { Button } from '../../ui/button/button';

import classes from './results-title.module.css';

export const ResultsTitle = (props) => {
  const { date } = props;

  const humanReadableDate = new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <section className={classes.title}>
      <h1>Events in {humanReadableDate}</h1>
      <Button link="/events">Show All Events</Button>
    </section>
  );
};
