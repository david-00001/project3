fetch('/api/v1.0/race-by-state')
  .then(function (response) {
    return response
    // return response.json();
  }).then(function (text) {
    console.log('GET response:');
    console.log(text); 
  });