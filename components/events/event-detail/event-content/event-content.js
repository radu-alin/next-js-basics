import classes from './event-content.module.css';

export const EventContent = (props) => (
  <section className={classes.content}>{props.children}</section>
);
