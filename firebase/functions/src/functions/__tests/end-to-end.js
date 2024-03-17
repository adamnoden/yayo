const axios = require("axios");
const { logSuccess, logError, checkEmulatorRunning } = require("./utils");
const { BASE_URL } = require("./config");

async function runTests() {
  const emulatorRunning = await checkEmulatorRunning();
  if (!emulatorRunning) return;

  let pickId = null;

  try {
    const addResponse = await axios.post(`${BASE_URL}/addStockPick`, {
      data: { userId: "foobar", ticker: "TEST", shares: 10, buyPrice: 100.5 },
    });
    pickId = addResponse.data.result.id;
    logSuccess(`Added stock pick with ID: ${pickId}`);
  } catch (error) {
    logError(
      `Error during 'addStockPick' request: ${
        error.response?.data || error.message
      }`
    );
    return;
  }

  try {
    const sellResponse = await axios.post(`${BASE_URL}/sellStockPick`, {
      data: { pickId, userId: "foobar", sellPrice: 190.0 },
    });
    logSuccess(`${sellResponse.data.result.message}`);
  } catch (error) {
    logError(
      `Error during 'sellStockPick' request: ${
        error.response?.data || error.message
      }`
    );
    return;
  }

  try {
    const balanceResponse = await axios.post(
      `${BASE_URL}/getUserAccountBalance`,
      {
        data: { userId: "foobar" },
      }
    );
    logSuccess(
      `User account balance fetched: $${balanceResponse.data.result.balance}`
    );
  } catch (error) {
    logError(
      `Error during 'getUserAccountBalance' request: ${
        error.response?.data || error.message
      }`
    );
    return;
  }
}

runTests();
