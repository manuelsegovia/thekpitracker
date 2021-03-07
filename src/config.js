const dotenv = require('dotenv');
const assert = require('assert');

dotenv.config();

const {
  NODE_ENV,
  PORT,
  HOST,
  HOST_URL,

  COOKIE_PWD,

  OKTA_ORG_URL,
  OKTA_CLIENT_ID,
  OKTA_CLIENT_SECRET,

  MONGO_DB,
} = process.env;
assert.ok(NODE_ENV, 'NODE_ENV is required');
assert(PORT, 'PORT is required');
assert(HOST, 'HOST is required');
assert(HOST_URL, 'HOST_URL is required');
assert(COOKIE_PWD, 'COOKIE_PWD is required');
assert(OKTA_ORG_URL, 'OKTA_ORG_URL is required');
assert(OKTA_CLIENT_ID, 'OKTA_CLIENT_ID is required');
assert(OKTA_CLIENT_SECRET, 'OKTA_CLIENT_SECRET is required');

module.exports = {
  nodeEnv: NODE_ENV,
  port: PORT,
  host: HOST,
  hostUrl: HOST_URL,

  cookiePwd: COOKIE_PWD,

  oktaOrgUrl: OKTA_ORG_URL,
  oktaClientId: OKTA_CLIENT_ID,
  oktaClientSecret: OKTA_CLIENT_SECRET,

  mongoDb: MONGO_DB,
};
