const express = require("express");

let app = express();

app.get('/', (req, res) => {
  res.send('Hello World B!');
});

app.listen(3001, () => {
  console.log('Example app listening on port 3001 for testing B');
});
