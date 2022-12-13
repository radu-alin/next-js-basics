import { useRef, useContext } from 'react';
import { addNewsLetterAPI } from '../../api';
import NotificationContext from '../../store/notification-context';

import classes from './newsletter-registration.module.css';

function NewsletterRegistration() {
  const notificationCtx = useContext(NotificationContext);

  const emailInputRef = useRef();

  async function registrationHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;

    const reqBody = JSON.stringify({ email: enteredEmail });

    notificationCtx.showNotification({
      title: 'Signing up...',
      message: 'Registering for newsletter.',
      status: 'pending',
    });

    try {
      const response = await addNewsLetterAPI(reqBody);
      if (response.ok) {
        notificationCtx.showNotification({
          title: 'Success',
          message: 'Successfully registered for newsletter!',
          status: 'success',
        });
      } else {
        throw new Error(response.message || 'Something went wrong.');
      }
    } catch (error) {
      notificationCtx.showNotification({
        title: 'Error',
        message: error.message || 'Something went wrong!',
        status: 'error',
      });
    }
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            ref={emailInputRef}
            placeholder="Your email"
            aria-label="Your email"
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
