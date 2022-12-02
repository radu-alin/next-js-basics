import classes from './error-alert.module.css';

export const ErrorAlert = (props) => (
  <div className={classes.alert}>{props.children}</div>
);
