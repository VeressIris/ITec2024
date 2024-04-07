// server.mjs
import { createServer } from "node:http";
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

const server = createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hello World!\n");

  if (req.method === "POST" && req.url === "/app") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      const postData = querystring.parse(body);
      const currentApp = postData.currentApp;
      console.log(currentApp);
    });
  }
});

// starts a simple http server locally on port 3000
server.listen(3000, "127.0.0.1", () => {
  console.log("Listening on 127.0.0.1:3000");

  const database = admin.database();

  function get10Status(interval, endpointUrl) {
    let last10Status = [200, 200, 200, 200, 200, 200, 200, 200, 200, 200];
    setInterval(() => {
      fetch(endpointUrl)
        .then((response) => {
          last10Status.push(response.status);
          last10Status = last10Status.splice(1);
          console.log(last10Status);
          console.log(getEndpointStatus());
        })
        .catch((error) => {
          last10Status.push(response.status);
          last10Status = last10Status.splice(1);
          console.log(getEndpointStatus());
          console.error(
            "There was a problem with the endpoint:",
            error.message
          );
        });
    }, interval);
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
  // get10Status(5000, "https://official-joke-api.appspot.com/random_joke");
  //   get10Status(5000, "https://randomuser.me/api/");
  //   get10Status(5000, "	https://v2.jokeapi.dev/joke/Any?safe-mode");
  //     get10Status(700, "https://httpstat.us/Random/200,201,500-504");
});
