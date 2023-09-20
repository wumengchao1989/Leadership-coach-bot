require("dotenv").config();
const { getConnectionInfo } = require("../config/connection");
const Keyv = require("keyv");
const { DATABASE_URL } = getConnectionInfo();
const keyv = new Keyv(DATABASE_URL, "tested_file");
const coachdataKeyv = new Keyv(DATABASE_URL, { namespace: "coachdata" });

module.exports = { keyv, coachdataKeyv };
