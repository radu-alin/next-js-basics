export async function addNewsLetterAPI(reqBody) {
  return fetch('/api/newsletter', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: reqBody,
  });
}

export async function getCommentsAPI(eventId) {
  const response = await fetch('/api/comments/' + eventId, {
    method: 'GET',
  });
  const data = await response.json();
  return data.comments;
}

export async function addCommentAPI(eventId, commentData) {
  return await fetch('/api/comments/' + eventId, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(commentData),
  });
}
