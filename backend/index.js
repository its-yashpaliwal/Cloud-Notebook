const express = require('express')
const app = express()
var cors = require('cors')


app.use(cors())
const connectToMongo = require('./db');

const port = 8000


////Connect to database
connectToMongo();

app.use(express.json());

//Available Routes

app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.listen(port, async () => {
  console.log(`Example app listening on port ${port}`);

})
