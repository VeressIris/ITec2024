const endpointUrl = 'https://example.com/api/endpoint';

fetch(endpointUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    console.log('Endpoint is reachable');
  })
  .catch(error => {
    console.error('There was a problem with the endpoint:', error.message);
  });
