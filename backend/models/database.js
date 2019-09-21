const { Client } = require('pg');

const client = new Client({
  user: 'teamTwo',
  host: 'database-1.cm5eeglseqxy.us-east-1.rds.amazonaws.com',
  database: 'teamTwoDB',
  password: 'Welcome123!',
  port: 5432,
})
client.connect()

module.exports = {
  query: (text, params, callback) => {
    return client.query(text, params, callback)
  },
}