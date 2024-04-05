const endpointUrl = "https://randomuser.me/api/";

fetch(endpointUrl)
  .then((response) => {
    switch (response.status) {
      case 200:
        console.log("200 verde");
        break;
      default:
        //check if bug is reported (marked as unstable)
        console.log("rosu");
    }
  })
  .catch((error) => {
    console.error("There was a problem with the endpoint:", error.message);
  });
