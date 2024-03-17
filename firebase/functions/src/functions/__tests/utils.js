const { BASE_URL } = require("./config");
const axios = require("axios");

// ANSI color codes
const COLORS = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  red: "\x1b[31m",
  bgGreen: "\x1b[42m",
};

const logSuccess = (message) => {
  console.log(`${COLORS.green}✔${COLORS.reset} ${message}`);
};

const logError = (message) => {
  console.error(`${COLORS.red}✖${COLORS.reset} ${message}`);
};

const logAllTestsPassed = (message) => {
  console.log(
    `\n${COLORS.bgGreen}                 ${message}                 ${COLORS.reset}\n`
  );
};

async function checkEmulatorRunning() {
  try {
    await axios.get(`${BASE_URL}/healthcheck`);
    logSuccess("Healthcheck pass");
    return true;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data?.message ||
        error.response?.statusText ||
        "No error message";
      logError(`Healthcheck failed: ${message}`);
    } else {
      // Non-Axios error (unlikely in this context, but good for completeness)
      logError(`Healthcheck failed: ${error.message || "No error message"}`);
    }
    return false;
  }
}

module.exports = {
  logSuccess,
  logError,
  checkEmulatorRunning,
  logAllTestsPassed,
};
