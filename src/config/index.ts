const { config } = require('dotenv')
const { parsed } = config()

const {
  NODE_ENV,
  MONGO_DB_KEY,
  JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET,
  PORT
} = parsed

export {
  NODE_ENV,
  MONGO_DB_KEY,
  JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET,
  PORT
}