const http = require('http');
const PORT = 9000;

const app=require("./app.js");

app.listen(PORT, () => console.log(`listening at port ${PORT}....`));