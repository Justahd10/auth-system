// Create Schema
const schema = {
  'type': "object",
  'required': [
    "AUTH_TOKEN_SECRET",
    "AUTH_TOKEN_ISSUER",
    "SERVICE_EMAIL_FROM",
    "SERVICE_DB_CONNECTION",
    "SERVICE_REDIS_URL",
    "SERVICE_REDIS_USER",
    "SERVICE_REDIS_PASSWORD",
    "SERVICE_EMAIL_APP_PASSWORD"
  ],
  'properties': {
    'AUTH_TOKEN_SECRET': {
      'type': "string"
    },
    'AUTH_TOKEN_ISSUER': {
      'type': "string"
    },
    'SERVICE_EMAIL_APP_PASSWORD': {
      'type': "string"
    },
    'SERVICE_DB_CONNECTION': {
      'type': "string"
    },
    'SERVICE_REDIS_URL': {
      'type': "string"
    },
    'SERVICE_REDIS_USER': {
      'type': "string"
    },
    'SERVICE_REDIS_PASSWORD': {
      'type': "string"
    }
  }
};

export default schema