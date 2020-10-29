const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const fs = require('fs');

app.use((req, res, next) => {
  //middleware
  console.log(req.originalUrl);
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  //write submission to file
  const jsonObject = {};
  jsonObject['email'] = req.body.email;
  jsonObject['name'] = req.body.name;
  fs.writeFile('submission.json', JSON.stringify(jsonObject), (err) => {
    if (err) throw err;
  });
  next();
});

app.post('/formsubmissions', (req, res) => {
  //read from file
  fs.readFile('submission.json', (err, data) => {
    if (err) throw err;
    res.send(JSON.parse(data)); //send data
  });
});

app.use(express.static('public'));

//step REQUIRED/3
app.get('/', (req, res) => res.send('Hello from the web server side...'));

app.listen(port, () => console.log(`Example app listening on port ${port}`));
