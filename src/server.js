let express = require('express');
let cors = require('cors');
let bodyParser = require('body-parser');
let port = process.env.PORT || 5000;

let app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const userRoutes = require('./routes/userRoutes');
const scoreRoutes = require('./routes/scoreRoutes');

app.use('/api/users', userRoutes);
app.use('/api/scores', scoreRoutes); 

app.get('/', (req, res) => {
  let message = 'Golf Handicap Calculator API is running!';
  res.json({ message: message });
});

function start_server() {
  app.listen(port, () => {
    console.log('Server running on port ' + port);
    console.log('Accessible at: http://0.0.0.0:' + port);
    console.log('External access: http://localhost:' + port);
  });
}

start_server();