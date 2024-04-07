import { createServer, get } from "node:http";
import admin from "firebase-admin";
import fs from "fs";
import querystring from "querystring";

const serviceAccount = JSON.parse(
  fs.readFileSync(
    "../itec2024-e4088-firebase-adminsdk-dqjjo-cef864076c.json",
    "utf8"
  )
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    "https://itec2024-e4088-default-rtdb.europe-west1.firebasedatabase.app",
});

let currentApp = "";
const server = createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hello World!\n");
});

// starts a simple http server locally on port 3000
server.listen(3000, "127.0.0.1", () => {
  console.log("Listening on 127.0.0.1:3000");

  const database = admin.database();
  database.ref("apps").on("value", (snapshot) => {
    snapshot.forEach((childSnapshot) => {
      const endpoints = childSnapshot.val().endpoints;
      Object.keys(endpoints).forEach((endpoint) => {
        // console.log(childSnapshot.val().link + endpoint);
        get10Status(
          5000,
          childSnapshot.val().link + endpoint,
          childSnapshot.key,
          endpoint
        );
      });
    });
  });

  getAppsStatus();

  function get10Status(interval, endpointUrl, appName, endpoint) {
    let last10Status = [200, 200, 200, 200, 200, 200, 200, 200, 200, 200];
    setInterval(() => {
      fetch(endpointUrl)
        .then((response) => {
          last10Status.push(response.status);
          last10Status = last10Status.splice(1);
          // console.log(last10Status);
          const endpointStatus = getEndpointStatus(last10Status);
          // console.log(endpointStatus);
          setEndpointStatus(appName, endpoint, endpointStatus);
        })
        .catch((error) => {
          last10Status.push(404);
          last10Status = last10Status.splice(1);
          setEndpointStatus(appName, endpoint, "down");
          setAppStatus(appName, "down");
          // console.log(getEndpointStatus(last10Status));
          console.log("There was a problem with the endpoint:", error.message);
        });
    }, interval);
  }

  function getEndpointStatus(last10Status) {
    let okCount = 0;
    last10Status.forEach((status) => {
      if (status == 200 || status == 302) {
        okCount++;
      }
    });
    // console.log(okCount);
    if (okCount == 0) return "down";
    if (okCount < 10) return "unstable";
    return "stable";
  }

  function setEndpointStatus(appName, endpoint, newStatus) {
    database.ref(`apps/${appName}/endpoints/${endpoint}/status`).set(newStatus);
  }

  function getAppsStatus() {
    database.ref("apps").on("value", (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        setInterval(() => {
          const endpoints = childSnapshot.val().endpoints;
          console.log(endpoints);
          let badCnt = 0;
          Object.keys(endpoints).forEach((endpoint) => {
            console.log(endpoint + ": " + endpoints[endpoint].status);
            const status = endpoints[endpoint].status;
            if (status == "down") {
              badCnt++;
            }
          });
          if (badCnt == 0) setAppStatus(childSnapshot.key, "stable");
          else if (badCnt < Object.keys(endpoints).length)
            setAppStatus(childSnapshot.key, "unstable");
          else setAppStatus(childSnapshot.key, "down");
        }, 5000);
      });
    });
  }

  function setAppStatus(appName, newStatus) {
    database.ref(`apps/${appName}/status`).set(newStatus);
  }
  // get10Status(5000, "http://www.boredapi.com/api/");
  // get10Status(5000, "https://official-joke-api.appspot.com/random_joke");
  //   get10Status(5000, "https://randomuser.me/api/");
  // get10Status(5000, "	https://www.boredapi.com/api/activity");
  // get10Status(5000, "	https://www.boredapi.com/api/getThis");
  // get10Status(5000, "	https://v2.jokeapi.dev/joke/Any?safe-mode");
  // get10Status(700, "https://httpstat.us/Random/200,201,500-504");
});
