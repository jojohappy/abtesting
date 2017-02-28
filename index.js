const express = require("express");

let app = express();

app.get('/', (req, res) => {
  res.send('Hello World A!');
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000 for testing A');
});
