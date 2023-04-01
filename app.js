const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

//const dotenv = require("dotenv/config");
// const secrets = require("./secrets");
// const { response } = require('express');

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signup.html");
});

// app.post("/home", (req, res) => {
//   res.redirect("/");
// });

app.post("/", (req, res) => {
  const body = req.body;
  const firstName = req.body.fname;
  const lastName = req.body.lname;
  const email = req.body.email;
  //console.log(firstName,lastName,email);

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };

  // convert to flat pack
  const jsonData = JSON.stringify(data);
  const apikeyid = "d4b4b30418d8e96bf24cca64ae2c530f-us21";
  const usX = "21"; // in above line we have the appid hosted on us server 14;
  const appid = "e58cd13c28";
  const url = "https://us" + usX + ".api.mailchimp.com/3.0/lists/" + appid;

  const options = {
    method: "POST",
    auth: "RiyaPoonia:" + apikeyid,
  };

  const request = https.request(url, options, (response) => {
    //console.log(response.statusCode);
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }
    response.on("data", (data) => {
      //console.log(JSON.parse(data));
    });
  });

  request.write(jsonData);
  request.end();
});

app.post("/failure", (req, res) => {
  res.redirect("/");
});

app.listen(process.evv.PORT || 4000, function () {
  console.log("Server at port 4000");
});

// api key
// d4b4b30418d8e96bf24cca64ae2c530f-us21

//audience id
// e58cd13c28

// https://${dc}.api.mailchimp.com/3.0/lists
