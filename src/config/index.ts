const { config } = require('dotenv')
const { parsed } = config()

const {
  NODE_ENV,
  MONGO_DB_KEY,
  JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET,
  PORT,
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASSWORD,
  API_URL
} = parsed

export {
  NODE_ENV,
  MONGO_DB_KEY,
  JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET,
  PORT,
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASSWORD,
  API_URL
}