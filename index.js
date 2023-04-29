const app = require('./src/app')
const { database } = require('./src/db')
const dotenv = require('dotenv')


dotenv.config()

const PORT = process.ENV.APP_PORT || 3030

app.listen(PORT, '0.0.0.0', async () => {
  await database.sync()
    .then(() => console.log('server listening on port', APP_PORT))
    .catch(err => console.log(err.message))
})
