let last10Status = [];
let k = 0;
function get10Status(interval, endpointUrl) {
  fetch(endpointUrl)
    .then((response) => {
      k++;
      console.log(k + ": " + response.status);
      last10Status.push(response.status);
      if (k == 10) {
        console.log("last 10: ", last10Status);
        k = 0;
        console.log(getEndpointStatus());
        last10Status = [];
      }
    })
    .catch((error) => {
      console.error("There was a problem with the endpoint:", error.message);
    })
    .finally(() => {
      setTimeout(get10Status, interval, endpointUrl, interval);
    });
}

function getEndpointStatus() {
  let okCount = 0;
  last10Status.forEach((status) => {
    if (status == 200 || status == 302) {
      okCount++;
    }
  });
  console.log(okCount);
  if (okCount == 0) return "down";
  if (okCount < 10) return "unstable";
  return "stable";
}

// get10Status(5000, "http://www.boredapi.com/api/");
// get10Status(5000, "https://api.publicapis.org/entries");
// get10Status(5000, "https://official-joke-api.appspot.com/random_joke");
// get10Status(5000, "https://randomuser.me/api/");
// get10Status(5000, "	https://v2.jokeapi.dev/joke/Any?safe-mode");
// get10Status(5000, "	https://randomuser.me/api/");
