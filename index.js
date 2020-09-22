const express = require('express');
const bodyParser = require('body-parser');

const config = require('./config');
const loadMeetingRoutes = require('./meeting-management');

const app = express();
app.use(bodyParser.json());

loadMeetingRoutes(app);

app.post('/errors', function(req, res) {
  console.log(req.body);
  res.sendStatus(200);
});

const port = config.PORT;
app.listen(port, function() {
  console.log(`App is listening on port ${port}`);
});
