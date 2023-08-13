const express = require('express');

const routes = require('./routes');
const expressConfig = require('./config/expressConfig');
const dbConnect = require('./config/dbConfig');


const app = express();

const PORT = '3000';


app.get('/', (req, res) => {
    res.send('<h1>Hello from RESTful server!</h1>');
});


dbConnect()
    .then(() => console.log('DB connected successfully!'))
    .catch(err => console.log('DB error: ', err));

expressConfig(app)
app.use(routes);

app.listen(PORT, () => console.log(`RESTful server is listening on port ${PORT}...`));