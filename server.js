// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// Serve the index.HTML file 
var absolutePath = __dirname + "/views/index.html"
app.get("/", function(req, res){res.sendFile(absolutePath)});

// Serve static assets (CSS)
var absoluteAssetsPath = __dirname + "/public";
app.use(express.static(absoluteAssetsPath))

// Get input date from client - Route date parameter */
app.get('/api/timestamp/:date_string?', function(req, res) {
    
    let date_string = req.params.date_string;
    var dt;    

    //if no date was give, get current timestamp
    if (date_string === undefined) {
        dt = new Date();
    }
    else{
      if (isNaN(date_string)) //UTC tmiestamp
        dt = new Date(date_string);
      else  //unix number timestamp in milliseconds
        dt = new Date(Number(date_string));
   }      
  
  if (isNaN(dt))  //if not a valid date
    res.json({"unix": null, "utc": "Invalid Date" });
  else
    res.json({"unix": dt.getTime(), "utc": dt.toUTCString()});
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});