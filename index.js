const express = require('express')
const bodyParser = require('body-parser')
var cors = require('cors')
const app = express()
const port = 3000

const userRoutes = require('./routes/userRoutes');
const campaignerRoutes = require('./routes/campaignerRoutes');
const campaignRoutes = require('./routes/campaignRoutes');
const expertRoutes = require('./routes/expertRoutes');
const organisationRoutes = require('./routes/organisationRoutes');
const promiseRoutes = require('./routes/promiseRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const voteRoutes = require('./routes/voteRoutes');
const voterRoutes = require('./routes/voterRoutes');

app.use(cors())

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

// Routes
app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.use('/users', userRoutes);
app.use('/campaigners', campaignerRoutes);
app.use('/campaigns', campaignRoutes);
app.use('/experts', expertRoutes);
app.use('/organisations', organisationRoutes);
app.use('/promises', promiseRoutes);
app.use('/reviews', reviewRoutes);
app.use('/transactions', transactionRoutes);
app.use('/votes', voteRoutes);
app.use('/voters', voterRoutes);

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})


// Error-handling Middleware
app.use((req, res, next) => {
  const error = new Error('Something went wrong');
  next(error);
});

app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).send('Internal Server Error');
});