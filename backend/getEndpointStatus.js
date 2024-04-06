const endpointUrl = "https://randomuser.me/api/";
let last10Status = [];
let k = 0;
function get10Status(interval) {
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
      setTimeout(get10Status, interval, interval);
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

get10Status(10000);
