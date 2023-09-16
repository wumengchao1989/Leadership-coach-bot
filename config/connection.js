require("dotenv").config();

async function getConnectionInfo() {
  return {
    DATABASE_URL: process.env.markname==='wmc'?process.env.DATABASE_URL:process.env.DATABASE_DEV_URL,
    DATABASE_NAME: process.env.DATABASE_NAME,
  };
}

module.exports = {
  getConnectionInfo,
};
