import Link from 'next/link';

import classes from './button.module.css';

export const Button = (props) => {
  const { link, onClickAction, children } = props;

  if (link) {
    return (
      <Link href={link} className={classes.btn}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes.btn} onClick={onClickAction}>
      {children}
    </button>
  );
};
