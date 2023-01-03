import express from "express";
import fetch from "node-fetch";

const app = express();

app.set("views", "./views"); //set the views shortcut
app.set("view engine", "ejs");


app.use(express.static("public"));

const redirect_uri = "http://localhost:3000/callback"; //whitelisted redirect uri via developer dashboard
const client_id = "bc138b8d2f814b4d881e26d13cccbf72"; //client id from developer dashboard
const client_secret = "dd8bea225a2041c28b59846c68adee10"; //client secret from developer dashboard

global.access_token;

//file to first render
app.get("/", function (req, res) {
  res.render("index");
});

//authorize the user by getting a code
app.get("/authorize", (req, res) => {
  var auth_query_parameters = new URLSearchParams({
    response_type: "code",
    client_id: client_id,
    scope: "user-top-read",
    redirect_uri: redirect_uri,
  });

  res.redirect(
    "https://accounts.spotify.com/authorize?" + auth_query_parameters.toString()
  );
});

//get the access token from the code
app.get("/callback", async (req, res) => {
  const code = req.query.code;

  var body = new URLSearchParams({
    code: code,
    redirect_uri: redirect_uri,
    grant_type: "authorization_code",
  });

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "post",
    body: body,
    headers: {
      "Content-type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        Buffer.from(client_id + ":" + client_secret).toString("base64"),
    },
  });

  const data = await response.json();
  global.access_token = data.access_token;

  res.redirect("/dashboard");
});

/*
Below is the function that gets the data from the spotify api.
*/


//generalized function to get data from the spotify api
async function getData(endpoint) {
  const response = await fetch("https://api.spotify.com/v1" + endpoint, {
    method: "get",
    headers: {
      Authorization: "Bearer " + global.access_token,
    },
  });

  const data = await response.json();
  return data;
}

//get the photos of the top 100 tracks albums
app.get("/dashboard", async (req, res) => {
  const userInfo = await getData("/me");
  const tracksShort = await getData("/me/top/tracks?time_range=short_term&limit=50");
  const artistsShort = await getData("/me/top/artists?time_range=short_term&limit=50");

  const tracksMed = await getData("/me/top/tracks?time_range=medium_term&limit=50");
  // console.log(tracksMed.items[0].);
  const artistsMed = await getData("/me/top/artists?time_range=medium_term&limit=50");

  const tracksLong = await getData("/me/top/tracks?time_range=long_term&limit=50");
  const artistsLong = await getData("/me/top/artists?time_range=long_term&limit=50");

  res.render("dashboard", { user: userInfo, 
    tracksShort: JSON.stringify(tracksShort.items), artistsShort: artistsShort.items, 
    tracksMed: JSON.stringify(tracksMed.items), artistsMed: artistsMed.items,
     tracksLong: JSON.stringify(tracksLong.items), artistsLong: artistsLong.items});
});

let listener = app.listen(3000, function () {
  console.log(
    "Your app is listening on http://localhost:" + listener.address().port
  );
});