require("dotenv").config();
const { getConnectionInfo } = require("../config/connection");
const Keyv = require("keyv");
const { DATABASE_URL } = getConnectionInfo();
const keyv = new Keyv(DATABASE_URL, "tested_file");
module.exports = { keyv };
