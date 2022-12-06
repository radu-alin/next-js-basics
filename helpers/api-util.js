const ALL_EVENTS_URL =
  'https://next-js-basics-default-rtdb.europe-west1.firebasedatabase.app/events.json';

export async function getAllEventsFirebase() {
  const res = await fetch(ALL_EVENTS_URL);
  const jsonObj = await res.json();

  const events = [];

  for (const key of Object.keys(jsonObj)) {
    events.push({
      id: key,
      ...jsonObj[key],
    });
  }

  return events;
}

export async function getFeaturedEventsFirebase() {
  const allEvents = await getAllEventsFirebase();

  return allEvents.filter((event) => event.isFeatured);
}

export async function getEventByIdFirebase(id) {
  const allEvents = await getAllEventsFirebase();

  return allEvents.find((event) => event.id === id);
}

export async function getFilteredEventsFirebase(dateFilter) {
  const allEvents = await getAllEventsFirebase();

  const { year, month } = dateFilter;

  let filteredEvents = allEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1;
  });

  return filteredEvents;
}
