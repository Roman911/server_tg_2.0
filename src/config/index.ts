const { config } = require('dotenv')
const { parsed } = config()

const {
  NODE_ENV,
  MONGO_DB_KEY,
  JWT_SECRET,
  JWT_MAX_AGE,
  PORT
} = parsed

export {
  NODE_ENV,
  MONGO_DB_KEY,
  JWT_SECRET,
  JWT_MAX_AGE,
  PORT
}