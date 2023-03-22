const app = require('./src/app')
const { database } = require('./src/db')
const dotenv = require('dotenv')


dotenv.config()

const APP_PORT = process.env.APP_PORT || 3030

app.listen(APP_PORT, async () => {
  await database.sync()
    .then(() => console.log('server listening on port', APP_PORT))
    .catch(err => console.log(err.message))
})
