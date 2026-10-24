// Create Schema
const schema = {
  'type': "object",
  'required': [
    "TOKEN_SECRET",
    "TOKEN_ISSUER",
    "DB_CONNECTION",
    "REDIS_URL",
    "REDIS_USER",
    "REDIS_PASSWORD",
    "EMAIL_FROM",
    "EMAIL_APP_PASSWORD"
  ],
  'properties': {
    'TOKEN_SECRET': {
      'type': "string"
    },
    'TOKEN_ISSUER': {
      'type': "string"
    },
    'EMAIL_FROM': {
      'type': "string"
    },
    'EMAIL_APP_PASSWORD': {
      'type': "string"
    },
    'DB_CONNECTION': {
      'type': "string"
    },
    'REDIS_URL': {
      'type': "string"
    },
    'REDIS_USER': {
      'type': "string"
    },
    'REDIS_PASSWORD': {
      'type': "string"
    }
  }
};

export default schema